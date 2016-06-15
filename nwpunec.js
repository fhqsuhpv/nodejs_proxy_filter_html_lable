/**
 * 西北工业大学
 */
exports.url = 'http://teach.nwpunec.net/nwpunec/admin/signup/signup.jsp';


exports.transform = function(str, req, res) {
  str = str.replace('<input type="button" value="二代证读取" name="FindReadBtn" onclick="ReadCard_onclick()">', '');
  
  return str;
}