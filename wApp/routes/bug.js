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

	// select bugs join admin table
	bugModule.query('select bugs._id,bugs.headline,bugs.reason,admin.login,bugs.level,bugs.project,bugs.environment from bugs left join admin on bugs.personid=admin._id', function(resluts) {
		if(resluts) {
			res.render('bug/list',{
				title: title,
				list: resluts
			});
		}
	});
};

exports.add = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);
	// code body
	var title = '缺陷';
	// 获取缺陷类型列表
	var bugType = util.getBugType();
	// 获取责任人列表
	adminModule.all(function(resluts) {
		if(resluts) {
			res.render('bug/add',{
				title:title,
				bugType:bugType,
				persons:resluts
			});
		}
	});
};

exports.addSetting = function(req, res) {
	// 检查session，是否登录，具有访问页面的权限
	util.isLogined(req, res);
	//code body
	var title = '缺陷';
	// 获取缺陷类型列表
	var bugType = util.getBugType();
	// 提交的参数
	var _cqid = req.param('cqid');
	var _type = req.param('type');
	var _reason = req.param('reason');
	var _personid = req.param('personid');
	var _level = req.param('level');
	var _environment = req.param('environment');
	var _headline = req.param('headline');
	var _description = req.param('description');
	var _modify = req.param('modify');
	var _project = req.param('project');
	var _closetime = req.param('closetime');
	var _createTime = util.getTimestamp();
	// 
	bugModule.isExistRow({
		cqid: _cqid
	}, function(result) {
		if(result && result.length>0) {
			title = '失败';
			// 获取责任人列表
			adminModule.all(function(resluts) {
				if(resluts) {
					res.render('bug/add',{
						title: title,
						action: 'exist',
						persons:resluts,
						bugType:bugType,
						// config js
						pagejs: {
							pathname: 'bug',
							filename: 'addSetting'
						}
					});
				}
			});
		} else {
			// 插入数据
			bugModule.insertRow({
				cqid: _cqid,
				headline: _headline,
				type: _type,
				reason: _reason,
				description: _description,
				modify: _modify,
				personid: _personid,
				level: _level,
				project: _project,
				environment: _environment,
				closetime: _closetime,
				createtime: _createTime
			},function(id) {
				var action = '';
				if(id) {
					action = 'success';
				} else {
					action = 'fail';
				}
				// 获取责任人列表
				adminModule.all(function(resluts) {
					if(resluts) {
						res.render('bug/add',{
							title:title,
							bugType:bugType,
							persons:resluts,
							action: action,
							// config js
							pagejs: {
								pathname: 'bug',
								filename: 'addSetting'
							}
						});
					}
				});
			});
		}
	});
};