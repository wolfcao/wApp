/**
 *	Group pages
 */

var util = require('../lib/util');
var groupModule = require('../module/group');
var departModule = require('../module/department');
var that = this;

exports.list = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);
	// code body
	var title = '小组';

	// select all
	groupModule.all(function(results) {
		if(results) {
			res.render('group/list',{
				title: title,
				list: results
			});
		} else {
			res.render('group/list',{
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
	var title = '小组';
	// 查询所有部门
	departModule.all(function(results) {
		if(results) {
			res.render('group/add',{
				title: title,
				departlist: results 
			});
		}
	});
};

// 提交新增的小组
exports.addSetting = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);

	// code body
	var title = '小组';
	var _name = req.param('name');
	var _departId = req.param('departid');
	
	groupModule.isExistRow({
		name: _name
	}, function(result) {
		if(result && result.length>0) {
			title = '失败';
			// 查询所有部门
			departModule.all(function(results) {
				if(results) {
					res.render('group/add',{
						title: title,
						action: 'exist',
						departlist: results,
						// config js
						pagejs: {
							pathname: 'group',
							filename: 'addSetting'
						}
					});
				}
			});
		} else {
			// 第一步：根据departid查出department name
			departModule.isExistRow({
				_id: _departId
			}, function(result) {
				if(result) {
					var _departName = result[0].name;
					// 第二步：新增一个小组
					groupModule.insertRow({
						name: _name,
						departid: _departId,
						departname: _departName
					}, function(id) {
						var action = '';
						if(id) {
							action = 'success';
						} else {
							action = 'fail';
						}
						// 第三步：查询所有部门
						departModule.all(function(results) {
							if(results) {
								res.render('group/add',{
									title: title,
									action: action,
									departlist: results,
									// config js
									pagejs: {
										pathname: 'group',
										filename: 'addSetting'
									}
								});
							}
						});
					});
				}
			});
		}
	});
};