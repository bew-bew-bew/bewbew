var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET add page. */
router.get('/', function (req, res, next) {
    res.render('event1', {title: 'Event'});
});


module.exports = router;
