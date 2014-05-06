var user = require('../models/user');

exports.index = function(req,res){
	res.render('index', {
		originalUrl: req.originalUrl
	});
};