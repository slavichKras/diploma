var db = require('../lib/mysql_wrapper');
var crypto = require('crypto');

module.exports = {
  table: 'ACCOUNT',

  find: function (condition, cb) {
    var query = 'SELECT * FROM ?? WHERE ?';
    var data = [this.table, condition];
    db.exec(query, data, cb);
  },

  findById: function (id, cb) {
    var query = 'SELECT * FROM ?? WHERE ID = ?';
    var data = [this.table, id];
    db.exec(query, data, cb);
  },

  /**
   * Create new user record to database
   */
  save: function (user, cb) {
    user.salt = this.makeSalt();
    user.password = this.encryptPassword(user.password, user.salt);
    var query = 'INSERT INTO users SET ?';
    db.exec(query, user, cb);
  },

  /**
   * Authenticate - check if the passwords are the same
   */
  
  
  authenticate: function (plainText, user) {
    return this.encryptPassword(plainText, user.SALT) == user.PASSWORD;
  },

  /**
   * Make salt

   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   */
  encryptPassword: function (password, salt) {
    if (!password) {
      return '';
    }
    try {
      return crypto.createHmac('sha1', salt).update(password).digest('hex');
    } 
    catch (err) {
      return '';
    }
  }
};