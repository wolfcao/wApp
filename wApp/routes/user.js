/*
 * User page.
 */
var util = require('../lib/util');
var adminModule = require('../module/admin');
var that = this;

exports.createAccount = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);
	// code body
	var title = '';
	var _loginName = req.param('login');
	var _passwd = req.param('passwd');
	var _email = req.param('email');

	// 检查账号是否已经存在
	adminModule.isExistRow({
		login: _loginName
	}, function(result) {
		if(result && result.length>0) {
			title = '失败';
			res.render('user/createaccount', {title: title, txt: '账户已经存在!'});
		} else {
			// 新增一个账号
			adminModule.insertRow({
				login: _loginName,
				passwd:util.md5(_passwd),
				email: _email
			}, function(id) {
				console.log(id);
			});
			title = '恭喜';
			res.render('user/createaccount', {title: title, txt: '账户注册成功!'});
		}
	});
};

// 个人管理
exports.setting = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);

	// code body
	var title = 'User setting';
	var id = req.session.user._id;
	adminModule.isExistRow({
		_id: id
	}, function(result) {
		res.render('user/setting', {
			title: title,
			user: result[0]
		});
	});
};

// 提交修改个人管理
exports.modifySetting = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);

	// code body
	var title = 'User setting';
	var _id = req.param('userid');
	var _email = req.param('email');
	// update admin infor
	adminModule.updateRow({
		email: _email
	}, {
		_id: _id
	});
	// findOne row
	adminModule.isExistRow({
		_id: _id
	}, function(result) {
		var action = '';
		if(result && result.length>0) {
			action = 'success';
		} else {
			action = 'fail';
		}
		res.render('user/setting',{
			title: title,
			action: action,
			user: result[0],
			// config js
			pagejs: {
				pathname: 'user',
				filename: 'modifySetting'
			}
		});
	});
};