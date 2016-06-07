var express = require('express');
var router = express.Router();
var User = require('../models/user');

/**
 * [userSignin 用户登录]
 * @return {[type]} [description]
 */
router.post('/signin', function(req, res, next) {

    User.findByEmail(req.body.user_email, function(err, user) {
        if (err) {
            console.log(err);
        };

        if (!user) {
            res.json({
                ret: 1,
                msg: '用户名不存在'
            });
            return;
        } else {
            user.comparePassword(req.body.user_password, function(isMatch) {
                if (isMatch) {
                    //保存用户的登录对话
                    req.session.user = user;
                    res.json({
                        ret: 0
                    });
                } else {
                    res.json({
                        ret: 1,
                        msg: '密码错误'
                    });
                }
            });
        }
    });

});
/**
 * [userSignup 用户注册]
 * @return {[type]} [description]
 */
router.post('/signup', function(req, res, next) {
    var _user = req.body;

    User.findOne({
        user_email: _user.user_email
    }, function(err, user) {
        console.log('user----' + JSON.stringify(user));
        if (err) {
            console.log(err);
            return;
        }

        if (user) {
            res.json({
                ret: 1,
                msg: '用户名已存在'
            });
        } else {
            user = new User(_user);
            console.log('User----' + user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                    return;
                }
                req.session.user = user;
                res.json({
                    ret: 0
                });
            });
        }
    });
});
router.get('/logout', function(req, res, next) {
    delete req.session.user;
    console.log('delete session user');
    //delete app.locals.user;
    res.redirect('/');
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var _id = req.params.id;
    User.findOne({
        _id: _id
    }, function(err, user) {
        console.log('user----' + JSON.stringify(user));
        if (err) {
            console.log(err);
            return;
        }
        res.render('userDetail',{user:user} );
    });


});

module.exports = router;