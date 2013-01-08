/**
 * @database test
 * @Table admin
 * @Description 操作admin表
 * @Add 2012.12.28
 **/

var database = 'test';
var table = 'admin';
var db = require('../lib/db');
var conn = db.conn(database);

var userDB = function() {
	db.useDB(conn, database);
}

exports.all = function() {
	userDB();
	db.selectAll(conn,table);
};

exports.insertRow = function(items, callback) {
	userDB();
	db.insert(conn, table, {
		login: items.login,
		passwd: items.passwd,
		email: items.email
	}, callback);
};

exports.updateRow = function(items, where) {
	userDB();
	db.update(conn, table, items, where);
};

// 通过自定义条件，查询数据表中是否有匹配
exports.isExistRow = function(items, callback) {
	userDB();
	db.findOne(conn, table, items, callback);
};

// 通过条件账户名和密码，查询数据表中是否有匹配
exports.isExistUser = function(items, callback) {
	userDB();
	db.findOne(conn, table, {
		login: items.login,
		passwd:items.passwd
	}, callback);
};