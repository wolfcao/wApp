/**
 * Sign page.
 */
 
var config = require('../config/config').config;
var util = require('../lib/util');
var adminModule = require('../module/admin');

// 注册页
exports.signup = function(req, res) {
	var title = 'Sign up';
	res.render('sign/signup',{
		title: title
	});
};

// 登录页
exports.signin = function(req, res) {
	var title = 'Sign in';
	req.session._loginReferer = req.headers.referer;
  res.render('sign/signin',{
  	title: title,
  	errcode: '200'
  });
}

exports.signout = function(req, res) {
	req.session.destroy();
	res.clearCookie(config.auth_cookie_name, { path: '/' });
	res.redirect(req.headers.referer || '/sign/signin');
};

// 登录验证
exports.session = function(req, res) {
	var title = 'Sign in';
	var _login = req.param('login');
	var _passwd = req.param('passwd');

	adminModule.isExistUser({
		login: _login,
		passwd:util.md5(_passwd)
	}, function(user) {
		if(user && user.length>0) {
			gen_session(user[0], res);
			res.redirect('/');
		} else {
			res.render('sign/signin',{ 
				title:title,
				errcode:'701'
			});
		}
	});
};

// auth_user middleware
// 检查session或cookie中的登录用户信息
exports.auth_user = function(req, res, next) {
	if(req.session.user) {
		adminModule.isExistRow({
			_id: req.session.user._id
		}, function(result) {
			if(result && result.length>0) {
				res.locals.curr_user = result[0];
				next();
			} else {
				res.locals.curr_user = req.session.user;
				next();
			}
		});
	} else {
		var cookie = req.cookies[config.auth_cookie_name];
		if (!cookie) {
			res.locals.curr_user = '';
			next();
			return;
		}
		var auth_token = util.decrypt(cookie, config.session_secret);
		var auth = auth_token.split('\t');
		var user_id = auth[0];
		adminModule.isExistRow({
			_id: user_id
		}, function(user) {
			if(user && user.length>0) {
				req.session.user = user[0];
				res.locals.curr_user = req.session.user;
				next();
			} else {
				res.locals.curr_user = '';
				next();
			}
			return;
		});
	}
	return;
};

// ==============================================================================================================================
// @private 记录用户的登录信息到cookie中
function gen_session(user,res) {
 	var auth_token = util.encrypt(user._id + '\t'+user.login + '\t' + user.passwd +'\t' + user.email, config.session_secret);
  res.cookie(config.auth_cookie_name, auth_token, {path: '/',maxAge: 1000*60*60*24*30}); //cookie 有效期30天
}