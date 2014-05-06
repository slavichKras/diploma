
/*
 * GET home page.
 */


module.exports = function (app) {
	require("./home")(app);
    require("./users")(app);
};