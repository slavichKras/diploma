
var config = require('nconf');
var passport = require('passport');
var mysql = require('mysql');
var AuthLocalStrategy = require('passport-local').Strategy;
 
passport.use('local', new AuthLocalStrategy(
    function (username, password, done) {
    	var connection = mysql.createConnection({
    		  host     : config.get("database:hostname"),
    		  port : config.get("database:port"),
    		  user     : config.get("database:user"),
    		  password : config.get("database:password"),
    		  database : config.get("database:name") 
    		});
    		
    		console.log(connection);
    		
    		connection.connect(function(err) {
    		  if (err) {
    			console.error('Error during connection to DB: ' + err.stack);
    			return;
    		  }
    		  console.log('Connected as id ' + connection.threadId);
    		});
    		
    		var query = 'SELECT * FROM `Аккаунт` WHERE `Логин`="'+username+'" AND `Пароль`="'+password+'"';
    		console.log(query);
    		
    		connection.query(query, function(err, rows, fields) {
    			if(err){
	    			console.error('Error during query: ' + err.stack);
	    			return;
    			}
    			console.log('The solution is: ', rows,rows.length);
    			if(rows.length>0) {
    				return done(null, {
    	                username: "admin",
    	                photoUrl: "url_to_avatar",
    	                profileUrl: "url_to_profile"
    	            });
    			}
    			else {
    				return done(null, false, { 
    		            message: 'Неверный логин или пароль' 
    		        });
    			}
    		});

    		connection.end();
    }
));


passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});


passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});

module.exports = function (app) {
};
 