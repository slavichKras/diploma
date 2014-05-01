/**
 * 
 * Boot/index.js
 * Main server boot file, requires initialization
 * of all the others
 * 
 */
module.exports = function (app) {
    require("./express")(app);
    require("./passport")(app);
};