var config = require('nconf');
var passport = require('passport');
var AuthLocalStrategy = require('passport-local').Strategy;
var usermodel = require("../models/user");
 
module.exports = function (app) {
    passport.serializeUser(function (user, done) {
      done(null, user.ID);
	});


	passport.deserializeUser(function (id, done) {
		usermodel.findById(id, function (err, results) {
				done(err, results[0]);
		});
	});
	
	passport.use('local', new AuthLocalStrategy(function (username, password, done) {
		usermodel.find({ login : username }, function (err, results) {
			if (err) {
				return done(err);
			}
			if (!results.length == 1) {
				return done(null, false, { message: 'Не найден пользователь с указанным логином' });
			}
			var user = results[0];
			if (!usermodel.authenticate(password, user)) {
				console.log('invalid password');
				return done(null, false, { message: 'Неверный пароль' });
			}
			return done(null, user);
		});
	}));
};
 