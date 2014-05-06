/**
 * New node file
 */
var index = require("../controllers/index");
var auth = require('../lib/authenticated');

module.exports = function (app) {
    app.get('/', auth, index.index);
};
