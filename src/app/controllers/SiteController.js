const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('home', { courses });
            })
            .catch((error) => {
                next(error);
            });
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
