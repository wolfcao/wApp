/**
 *	Department pages
 */

var util = require('../lib/util');
var departModule = require('../module/department');
var that = this;

exports.list = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);
	// code body
	var title = '部门';

	// select all
	departModule.all(function(results) {
		if(results) {
			res.render('department/list',{
				title: title,
				list: results
			});
		} else {
			res.render('department/list',{
				title: title,
				list: results
			});
		}
	});
};

exports.add = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);
	// code body
	var title = '部门';

	res.render('department/add',{
		title: title
	});
};

// 提交新增的部门
exports.addSetting = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);

	// code body
	var title = '部门';
	var _name = req.param('name');
	
	departModule.isExistRow({
		name: _name
	}, function(result) {
		if(result && result.length>0) {
			title = '失败';
			res.render('department/add',{
				title: title,
				action: 'exist',
				// config js
				pagejs: {
					pathname: 'department',
					filename: 'addSetting'
				}
			});
		} else {
			// 新增一个部门
			departModule.insertRow({
				name: _name
			}, function(id) {
				var action = '';
				if(id) {
					action = 'success';
				} else {
					action = 'fail';
				}
				res.render('department/add',{
					title: title,
					action: action,
					// config js
					pagejs: {
						pathname: 'department',
						filename: 'addSetting'
					}
				});
			});
		}
	});
};