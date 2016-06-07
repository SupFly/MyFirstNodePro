var express = require('express');
var router = express.Router();
var Course = require('../models/course');


/* GET user list . */
router.get('/list', function(req, res, next) {

    console.log('--------------req.query.keyword-------------' + req.query.keyword);

    var search = {};
    if (req.query.keyword) {
        search = {
            $text: {
                $search: req.query.keyword
            }
        }
    }
    var page = {
        limit: 5,
        num: 1
    };

    //查看哪页
    if (req.query.p) {
        page['num'] = req.query.p < 1 ? 1 : req.query.p;
    }

    var model = {
        search: search,
        columns: 'course_address course_class course_description course_tittle teacher_id',
        page: page
    };
    Course.findPagination(model, function(err, pageCount, list) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('--------------courseList-------------' + list);
        page['pageCount'] = pageCount;
        page['size'] = list.length;
        page['numberOf'] = pageCount > 5 ? 5 : pageCount;
        return res.render('dataList', {
            courseList: list,
            page: page,
            keyword: req.query.keyword
        });

    });
});

router.get('/create', function(req, res, next) {
    return res.render('createCourse');
});
router.post('/createCourse', function(req, res, next) {
    var _course = req.body;

    Course.findOne(_course, function(err, course) {
        console.log('course----' + JSON.stringify(course));
        if (err) {
            console.log(err);
            return;
        }

        if (course) {
            res.json({
                ret: 1,
                msg: '课程已存在'
            });
        } else {
            course = new Course(_course);
            console.log('course----' + course);
            course.save(function(err, user) {
                if (err) {
                    console.log(err);
                    return;
                }
                return res.redirect('/course/list');
            });
        }
    });
});

router.get('/:id', function(req, res, next) {

    var id = req.params.id;
    Course.findOne({
        _id: id
    }, function(err, course) {
        if (err) {
            console.log(err);
            return;
        }
        return res.render('courseDetail', {
            detail: course
        });
    });

});

module.exports = router;