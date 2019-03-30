var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.user) {
        var events = getEvents();
        res.render('index', {title: 'Home', events: events});
    } else {
        req.session.error = "Please login.";
        res.render('login', {title: 'Login'});
    }
});

/* GET home page. */
router.get('/index', function (req, res, next) {
    if (req.session.user) {
        var events = getEvents();
        res.render('index', {title: 'Home', events: events});
    } else {
        req.session.error = "Please login.";
        res.render('login', {title: 'Login'});
    }
});

router.get('/logout', function (req, res) {
    return function (req, res) {
        //clear session，cookie
        req.session.destroy(function () {
            res.clearCookie("user", {});
            res.cookie("isLogin", "false");
            res.redirect("/");
        });
    };
});

router.get('/login', function (req, res) {
    res.render('login', {title: 'Login'});
});

/* GET login page. */
router.post('/login', function (req, res, next) {
    var user = {
        username: 'wang',
        password: '123'
    }
    if (req.body.username == user.username && req.body.password == user.password) {
        req.session.user = user;
        req.session.isLogin = true;
        res.send(200);
    } else {
        res.send(404);
    }
});

router.post('/events', function (req, res) {
    var events = getEvents();
    res.send(JSON.stringify(events))
});


/**
 *
 * @param location
 * @param date
 * @param holder
 * @param address
 * @param firstPicture
 * @constructor
 */
class Event {
    constructor(location, date, holder, address, firstPicture) {
        this.location = location;
        this.date = date;
        this.holder = holder;
        this.address = address;
        this.firstPicture = firstPicture;
    }
}

class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

function getEvents() {
    var list = [];
    var localtemp = new Location(12, 22);
    var test1 = new Event(localtemp, '2019-5-12', 'Tim', 'S2 5JD', 'http://testpicture');
    var test2 = new Event(localtemp, '2019-5-12', 'Tim', 'S2 5JD', 'http://testpicture');
    list.push(test1);
    list.push(test2);
    return list;
}


module.exports = router;
