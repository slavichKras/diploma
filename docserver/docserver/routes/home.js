/**
 * New node file
 */
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            user: req.user
        });
    });
};