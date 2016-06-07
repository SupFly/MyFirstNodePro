var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Course = require('../models/course');

/* GET home page. */
router.get('/', function(req, res, next) {
    var _user;
    var _course;
    var query = User.find().limit(4);
    console.log('query'+ query.toString())

    // Course.find(function(course, err) {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         _course = course;
    //         res.render('index', {
    //             'user': _user,
    //             'course': _course
    //         });
    //     }).limit(4);
// function(user, err) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         _user = user;

//     }
            res.render('index', {
                'user': _user,
                'course': _course
            });
});


module.exports = router;