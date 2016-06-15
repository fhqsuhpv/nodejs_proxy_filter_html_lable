/**
 * 北京理工大学
 */
//对proxy进行了url访问处理，截取？前的内容进行处理
// exports.url = 'http://www.bitsde.com/mdes/matriculation/enrollment_agent/do.do?action=show_add';
exports.url = 'http://www.bitsde.com/mdes/matriculation/enrollment_agent/do.do';

exports.transform = function(str, req, res) {
  /** 
   * 实际代码
  */
  //去掉读取身份证按钮，及该元素调用
  str = str.replace(/<input.+type="button".+name="Submit".+value=".+".+class="CommonButton".+>/img, '');
  str = str.replace(/f.Submit.disabled.+;/img, '');
  //选择身份证时，照片不可上传，所以去掉这个设置
  str = str.replace(/f.Submit1.disabled.+;/img, '');
  //使按钮可用
  str = str.replace(/(.+<input.+name="Submit1".+class="CommonButton".+)(disabled="true")(.+)/, function(match, p1, p2, p3) {
    return p1 + p3;
  });
  return str;

}