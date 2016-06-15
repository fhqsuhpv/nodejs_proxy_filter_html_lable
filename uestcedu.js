/**
 * 电子科技大学
 */
exports.addUrl = 'http://www.uestcedu.com/ifree/console/apply/student/student_info_new.jsp';
exports.editUrl = 'http://www.uestcedu.com/ifree/console/apply/student/student_info_prop.jsp';


exports.transform = function(str, req, res) {
  str = str.replace('<input class="btn8" id="btnReadCardInfo" onclick="ReadCardInfo()" type="button" value="读取身份证信息">', '');
  //三个按钮是通过js往html写的，所以去掉这三个按钮的addHeaderLink就没有了。
  str = str.replace(/addHeaderLink(.+)/g, '');

  str = str.replace(/(.+<input.+ name="name".+)(readonly)(.+)/, function(match, p1, p2, p3) {
    return p1 + p3;
  });
  str = str.replace(/(.+<input.+id="card" name="id_card".+)(readonly)(.+)/, function(match, p1, p2, p3) {
    return p1 + p3;
  });
  str = str.replace(/(.+<input.+name="src" id="src".+)(disabled="disabled")(.+)/, function(match, p1, p2, p3) {
    return p1 + p3;
  });
  /**
   * 上传按钮
   */
  str = str.replace('$("#btnPhotoUpload").attr("disabled",true);');
  str = str.replace('$("#btnCidUpload").attr("disabled",true);');
  str = str.replace(/(.+<input.+id="btnPhotoUpload".+)(disabled="disabled")(.+)/, function(match, p1, p2, p3) {
    return p1 + p3;
  });
  return str;
}