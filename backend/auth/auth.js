var mongoose = require('mongoose');
var User = mongoose.model('users');

exports.isAuth = function (req, res, next) {
    if (!req.headers['token'] || req.headers['token'] === 'undefined') {
        return res.json({ status: 401, msg: 'invalid Request' })
    }
    var token = req.headers['token'];
    var user = new User();
    user.verifyToken(token, function (valid) {

        if (!valid) {
            return res.json({ status: 401, msg: 'Session Expired, Please login again' });
        }
        else {
            User.findOne({ '_id': valid._id, 'is_deleted': false,'status':1}, function (err, getUser) {
                if (getUser) {
                    req.body.user_params = valid;
                    next();
                }else{
                    return res.json({ status: 403, msg: 'Invalid Request' });
                }
            });
        }
    })
}


exports.isAdminAuth = function (req, res, next) {
    if (!req.headers['token'] || req.headers['token'] === 'undefined') {
        return res.json({ status: 401, msg: 'invalid request' })
    }
    var token = req.headers['token'];
    var user = new User();
    user.verifyToken(token, function (valid) {
        if (!valid || valid.scu != 777) {
            return res.json({ status: 401, msg: 'Unauthorized access,please login again as admin' });
        }
        else {
            req.body.user_params = valid;
            next();
        }
    })
}
