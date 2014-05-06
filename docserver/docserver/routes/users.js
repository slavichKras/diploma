/**
 * New node file
 */
var passport = require('passport');
var users = require('../controllers/users');
var auth = require('../lib/authenticated');

module.exports = function (app) {
	app.get('/sessions/new', users.showSignIn);
	app.get('/signup', users.showSignUp);
	app.get('/signout', users.signout);
	app.post('/users', users.create);
	app.post('/sessions',passport.authenticate('local', {
		failureRedirect: '/sessions/new',
		failureFlash: 'Неверный логин или пароль'
	}), users.session);
	app.get('/users/:userId', users.showProfile);
	app.param('userId', users.user);
	app.get('/showtestuser', users.showtestuser);

};