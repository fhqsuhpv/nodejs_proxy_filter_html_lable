var http = require('http');
var httpProxy = require('http-proxy');
var url = require('url');
var connect = require('connect');
var transformerProxy = require('transformer-proxy')
var iconv = require('iconv-lite');

var jlu = require('./jlu');

var app = connect();

var transformers = {};

function registerTransformer(url, func) {
  transformers[url] = func;
}

//吉林大学
var jlu = require('./jlu');
registerTransformer(jlu.url, jlu.transform);
//北京理工大学 ok
var bitsde = require('./bitsde');
registerTransformer(bitsde.url, bitsde.transform);
//电子科技大学 ok
var uestcedu = require('./uestcedu');
registerTransformer(uestcedu.addUrl, uestcedu.transform);
registerTransformer(uestcedu.editUrl, uestcedu.transform);
//西北工业大学 ok
var nwpunec = require('./nwpunec');
registerTransformer(nwpunec.url,nwpunec.transform);

var app = connect();

// proxy code

function extractCharset(res) {
  var contentType = res.getHeader('content-type');
  if (typeof contentType !== 'undefined') {
    var match = /.*charset=(.*)/.exec(contentType);
    if (match !== null) {
      return match[1];
    }
  }
  return 'utf8';
}

var transformerFunction = function(data, req, res) {

  //去掉url后面带的查询参数
  req.url = req.url.substring(0,req.url.match(/\?/)!=null?req.url.match(/\?/).index:req.url.length);
  if (req.url in transformers) {
    var charset = extractCharset(res);
    var str = iconv.decode(data, charset);
    console.log("found transformer for " + req.url);
    str = transformers[req.url](str, req, res);
    
    return iconv.encode(str, charset);
  };
  return data;
};

app.use(transformerProxy(transformerFunction));

var proxy = httpProxy.createProxyServer({});

app.use(function(req, res) {
  var obj = url.parse(req.url);
  var target = obj.protocol + "//" + obj.host;
  proxy.web(req, res, {
    target: target
  });
});

console.log("Proxy is up and running at port 8000");

http.createServer(app).listen(8000);

