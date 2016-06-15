exports.url = 'http://dec.jlu.edu.cn/baozi/work/recruit/enrol/enrol_form1.jsp?id=null'

exports.transform = function(str, req, res) {
  str = str.replace('<input type="button" value="读取身份证[新中新DKQ-A16D]" onclick="ReadCard()"/>', '');
  str = str.replace('<input type="button" value="读取身份证[神思SS628-100]" onclick="ReadCardHc()"/>', '');
  str = str.replace(/(.+<input.+ name="name".+)(readonly)(.+)/, function(match, p1, p2, p3) {
    return p1 + p3;
  });
  str = str.replace(/(.+<input.+id="card" name="id_card".+)(readonly)(.+)/, function(match, p1, p2, p3) {
    return p1 + p3;
  });
  str = str.replace(/(.+<input.+name="src" id="src".+)(disabled="disabled")(.+)/, function(match, p1, p2, p3) {
    return p1 + p3;
  });
  return str;
}
