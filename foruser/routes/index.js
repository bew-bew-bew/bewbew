var express = require('express');
var session = require('express-session');
var uuid = require('uuid');
var router = express.Router();

var list = [];

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

router.post('/newEvent', function (req, res) {
    if (req.session.user) {
        var loc = new Location(req.body.lag, req.body.lng);
        var event = new Event(loc, '2019-5-12', req.session.user.username, 'S2 5JD', 'http://testpicture');
        list.push(event);
        removeDuplicates();
        res.redirect('index');
    } else {
        res.render('login', {title: 'Login'});
    }
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
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

router.post('/events', function (req, res) {
    var events = getEvents();
    res.send(JSON.stringify(events))
});

/* GET event detail page. */
router.get('/event/:randomID', function (req, res) {
    var id = req.params.randomID;
    var it = null;

    var i;
    for (i = 0; i< list.length; i++){
        if (id == list[i].uuid) {
            it = list[i];
        }
    }
    if (it == null){
        res.sendStatus(500);
    } else {
        res.render('myEvent', {title: 'Event', event: it});
    }
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
    constructor(location, start, end, holder, address, firstPicture, name, uuid) {
        this.name = name;
        this.location = location;
        this.start = start;
        this.end = end;
        this.holder = holder;
        this.address = address;
        this.firstPicture = firstPicture;
        this.uuid = uuid;
    }
}

class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

function getEvents() {
    var localtemp = new Location(12, 22);
    var test1 = new Event(localtemp, '2019-5-13', '2019-5-14', 'Tim', 'S2 5JD', 'http://testpicture', 'party in diamond', 123);
    var test2 = new Event(localtemp, '2019-5-12', '2019-5-14', 'Tim', 'S2 5JD', 'http://testpicture', 'party in school', 456);
    list.push(test1);
    list.push(test2);
    removeDuplicates();
    return list;
}


function removeDuplicates() {
    let unique = {};
    list.forEach(function (item) {
        unique[JSON.stringify(item)] = item;
    });
    list = Object.keys(unique).map(function (u) {
        return JSON.parse(u);
    });
}

function buildID() {
    return uuid.v4();
}


module.exports = router;
