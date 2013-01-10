/**
 * @database test
 * @Table groups
 * @Description groups
 * @Add 2013.1.10
 **/

var database = 'test';
var table = 'groups';
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
		name: items.name,
		departid: items.departid,
		departname: items.departname
	}, callback);
};