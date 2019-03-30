var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET add page. */
router.get('/', function (req, res, next) {
    if (req.session.user) {
        res.render('add', {title: 'add'});
    } else {
        req.session.error = "Please login.";
        res.render('login', {title: 'login'});
    }
});








module.exports = router;
