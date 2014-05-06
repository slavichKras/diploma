/**
 * New node file
 */
var config = require('nconf');
var express = require('express');
var passport = require('passport');
var path = require('path');
var flash = require('connect-flash');
 
module.exports = function (app) {
 
    app.set('port', config.get("app:port") || 3000);
    
    var sessionOptions = config.get("session");
    if ('production' === app.get('env')) {
      var MemcachedStore = require('connect-memcached')(express);
      sessionOptions.store = new MemcachedStore(
                  config.get("memcached")
      );
    }
 
    app.use(express.logger({format : '[:date] :remote-addr - :method / HTTP :http-version :status   :res[Content-Length]'}));
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'jade');
    app.use(express.static(__dirname+'/../public'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session(sessionOptions));
    app.use(flash());
 
    app.use(passport.initialize());
    app.use(passport.session());
 
    app.use(app.router);
 
    if ('development' === app.get('env')) {
        app.use(express.errorHandler());
    }
    
    app.use(function(err, req, res, next){
        // treat as 404
        if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
          return next();
        }

        // log it
        console.error(err.stack);

        // error page
        res.status(500).render('500', { error: err.stack });
      });
    app.use(function(req, res, next){
        res.status(404).render('404', {
          url: req.originalUrl,
          error: 'Not found'
       });
    });

};