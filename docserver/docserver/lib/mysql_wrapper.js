
var mysql = require('mysql');
var config = require('nconf');

module.exports = {
  getConnection: function () {
    return mysql.createConnection({
      host     : config.get("database:hostname") || '127.0.0.1',
      port : config.get("database:port") || 3306,
      user     : config.get("database:user") || 'root',
      password : config.get("database:password") || '123456',
      database : config.get("database:name")
    });
  },

  connect: function (connection) {
    connection.connect(function(err) {
      if (err) {
        throw err;
      }
    });
  },

  disconnect: function (connection) {
    connection.end(function (err) {
      if (err) {
        throw err;
      }
    });
  },

  exec: function (query, data, cb) {
    var connection = this.getConnection();
    this.connect(connection);
    connection.query(query, data, function(err, res) {
      if (err) {
        cb(err);
      }
      cb(null, res);
    });
    this.disconnect(connection);
  }
};