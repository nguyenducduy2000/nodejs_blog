const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('me/stored-courses', { courses });
            })
            .catch((next) => {
                next(next);
            });
    }
}

module.exports = new MeController();
