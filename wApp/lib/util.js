var crypto = require('crypto'); // 加密、解密

util = exports;

var DATE = new Date();

util.getCurrYear = function() {
	return DATE.getFullYear();
}

util.getCurrWeek = function(date){  
    var date2=new Date(date.getFullYear(), 0, 1);
    var day1=date.getDay();
    if(day1==0) day1=7;
    var day2=date2.getDay();
    if(day2==0) day2=7;
    d = Math.round((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);
    return Math.ceil(d /7)+1;
}

// 加密
util.encrypt = function(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}
// 解密
util.decrypt = function(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}
// MD5加密
util.md5 = function(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

// 检查session，是否登录，具有访问页面的权限
util.isLogined = function(req, res) {
  if(!req.session || !req.session.user) {
    res.redirect('/sign/signin');
    return;
  }
}