var config = require('../config/config');
var mysql = require('mysql');

exports.conn = function(database) {
	var connection = mysql.createConnection({
		host:config.db.host,
		user:config.db.user,
		password:config.db.password,
		database:database,
		debug: false
	});
	return connection;
};

exports.useDB = function(connection, database) {
	connection.query('use ' + database);
};

exports.query = function(connection, sql, callback) {
	connection.query(sql, function(err, results) {
		if(err) {
			throw err;
		}
		if(results) {
			callback.call(this, results);
		}
	});
};

exports.selectAll = function(connection, table, callback) {
	connection.query('SELECT * FROM ' + table + ' where 1=1', function(err, results) {
		if(err) {
			throw err;
		}
		callback.call(this, results);
	});
};

// insert ==> items = {title:'test'}
exports.insert = function(connection, table, items, callback) {
	connection.query('insert into ' + table + ' set ?', items, function(err, result) {
		if(err) {
			throw err;
		}
		if(result) {
			callback.call(this, result); // result.insertId
		}
	});
};

// 
exports.update = function(connection, table, items, where) {
	var keyValueStr = keyValToStr(items, ',');
	var conditionStr = keyValToStr(where, 'and');

	connection.query('update ' + table + ' set ' + keyValueStr + ' where ' + conditionStr);
};

exports.findOne = function(connection, table, items, callback) {
	var keyValueStr = keyValToStr(items,'and');

	var query = connection.query('select * from ' + table + ' where ' + keyValueStr, function(err, result) {
		if(err) {
			throw err;
		}
		if(result) {
			callback.call(this, result);
		}
	});
	return query;
};

var keyValToStr = function(items, sep) {
	var reslt = [];
	for(var k in items) {
		var str = k + '=\'' + items[k] + '\'';
		reslt.push(str);
	}
	return reslt.join(' '+sep+' ');
}