/**
 *	Bug pages
 */

var util = require('../lib/util');
var adminModule = require('../module/admin');
var bugModule = require('../module/bug');
var that = this;

exports.list = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);
	// code body
	var title = '缺陷';

	// select all
	bugModule.all(function(results) {
		adminModule.isExistRow({
			_id: results[0].personid
		}, function(result) {
			results[0].personname = result[0].login;
			res.render('bug/list',{
				title: title,
				list: results
			});
		});
	});
};