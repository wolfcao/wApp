/**
 * @database test
 * @Table bugs
 * @Description 操作bugs表
 * @Add 2013.1.10
 **/

var database = 'test';
var table = 'bugs';
var db = require('../lib/db');
var conn = db.conn(database);

var userDB = function() {
	db.useDB(conn, database);
}

exports.all = function(callback) {
	userDB();
	db.selectAll(conn,table,callback);
};

// 通过自定义条件，查询数据表中是否有匹配
exports.isExistRow = function(items, callback) {
	userDB();
	db.findOne(conn, table, items, callback);
};

exports.insertRow = function(items, callback) {
	userDB();
	db.insert(conn, table, {
		cqid: items.cqid,
		headline: items.headline,
		type: items.type,
		reason: items.reason,
		description: items.description,
		modify: items.modify,
		personid: items.personid,
		level: items.level,
		project: items.project,
		environment: items.environment,
		closetime: items.closetime,
		createtime: items.createtime
	}, callback);
};

exports.query = function(sql, callback) {
	userDB();
	db.query(conn, sql, callback);
};