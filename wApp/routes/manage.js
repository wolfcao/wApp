/**
 * Sign page.
 */

var util = require('../lib/util');

exports.index = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);
	
	// code body
	var title = 'Manage';
	res.render('manage/manage',{
		title: title,
		// config js
		pagejs: {
			pathname: 'manage',
			filename: 'manage'
		}
	});
};