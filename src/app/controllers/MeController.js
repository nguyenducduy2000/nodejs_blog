const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}),
            Course.countDocumentsWithDeleted({ deleted: true }),
            Course.countDocuments,
        ])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then((courses) => {
                res.render('me/trash-courses', { courses });
            })
            .catch((next) => {
                next(next);
            });
    }
}

module.exports = new MeController();
