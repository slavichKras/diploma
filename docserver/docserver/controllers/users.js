var usermodel = require('../models/user.js');

exports.showSignIn = function (req, res) {
  res.render('sessions/new', {
    title: 'Sign In',
    user: req.user,
    message: req.flash('error')
  });
};

exports.showSignUp = function (req, res) {
  res.render('users/new', {
    title: 'Sign up',
    error: ''
  });
};

exports.signout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.session = function (req, res) {
  if (req.session.returnTo) {
    res.redirect(req.session.returnTo);
    delete req.session.returnTo;
    return;
  }
  console.log(req.session.returnTo);
  res.redirect('/');
};

exports.create = function (req, res) {
  var user = req.body;
  usermodel.save(user, function (err, result) {
    if (err) {
      console.log(err);
      return res.render('signup', {
        error: 'Username or Email already exists.',
        title: 'Sign up'
      });
    }
    if (result) {
      user.id = result.insertId;
      // manually login the user once successfully signed up
      req.login(user, function(err) {
        if (err) {
          throw err;
        }
        return res.redirect('/');
      });
    }
  });
};

exports.showProfile = function (req, res) {
  var user = req.profile;
  res.send(user);
};

exports.showtestuser = function (req, res) {
  usermodel.find({username: 'admin'}, function (err, results) {
    res.send(results);
  });
};

exports.list = function (req, res) {

};

exports.user = function (req, res, next, id) {
  usermodel.findById(id, function (err, results) {
    if (err) {
      return next(err);
    }
    var user = results[0];
    if (!user) {
      return next(new Error('Failed to load User ' + id));
    }
    req.profile = user;
    next();
  });
};