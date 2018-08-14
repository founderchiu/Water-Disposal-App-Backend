'use strict'
var mongoose = require('mongoose');
var constant = require('../../config/constants');
var User = mongoose.model('users');
var Geofence = mongoose.model('geofence');
var storeTime = mongoose.model('storetime');
// var SuperAdmin = mongoose.model('super_admin');
// var CompanyUser = mongoose.model('company_user');
// var WaterHauler = mongoose.model('water_hauler');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;
var crypto = require('crypto');
var _ = require('lodash');
var base64Img = require('base64-img');

//sonu code for superAdmin signup
var signup = function (req, res) {
    var imgsrc = req.body.imgUrl;
    delete req.body['imgUrl'];
    var user = new User(req.body);
    var outputJson = new Object();

    User.findOne({ 'email': req.body.email, 'is_deleted': false }, function (err, userEmailData) {
        if (err) {
            outputJson = { code: 301, status: "Failed", message: 'Server error while fetching user details', };
            return res.json(outputJson);
        }
        else {
            if (!_.isNull(userEmailData)) {
                outputJson = { code: 201, status: "Failed", message: 'Email already exists', };
                return res.json(outputJson);
            }
            else {
                user.save(function (err, admin) {
                    if (err) {
                        console.log(err);
                        outputJson = { code: 201, status: "Failed" };
                        return res.json(outputJson);
                    } else {
                        if (imgsrc) {
                            base64Img.img(imgsrc, 'public/images', admin._id + "_user", function (err, filepath) {
                                if (err) {
                                    console.log("Something wrong", err)
                                }
                                else {
                                    var respath = filepath.slice(6);
                                    User.update({ _id: admin._id }, { $set: { company_logo: respath } }, function (err, imageupdated) {
                                        if (err) {

                                        }
                                        else {

                                        }
                                    })
                                }
                            });
                        }
                        outputJson = { code: 200, status: "Success", message: 'User registered successfully', data: admin };
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false,// use SSL
                            debug: true,
                            auth: {
                                user: 'ak56nit@gmail.com',
                                pass: 'Anmol_897'
                            }
                        });
                        var mailOptions = {
                            from: 'ak56nit@gmail.com',
                            to: req.body.email,
                            subject: 'user login',
                            html: `<h3>Dear Member,</h3>
                              <p>
                              Thanks you so much for joining water disposal system, Use this userName & password for login.
                              </p>

                              <p>
                              Email: ` + req.body.email + `<br>` + `Password: ` + req.body.password + `
                              </p>
                              <p>
                              Thanks,
                               </p>
                              <p>
                              Water hular Team
                              </p >`
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent to: ', info.messageId);

                        });
                        return res.json(outputJson);
                    }
                });
            }
        }
    });
}

var login = function (req, res) {
    var userData = req.body ? req.body : {};
    // console.log('userData==',userData);
    // console.log('userData==>>>',userData.radius);
    User.findOne({ 'email': userData.email, 'is_deleted': false }, function (err, getUser) {

        if (getUser) {
            var password = crypto.pbkdf2Sync(userData.password, getUser.salt, 1000, 64, 'sha1').toString('hex');
            User.findOne({
                'email': userData.email,
                'password': password,
                'is_deleted': false
            }, function (err, loginData) {
                if (!_.isNull(loginData)) {
                    if (loginData.status == 0) {
                        return res.json({ code: 301, status: "Error", message: "Please contact your administrator to enable your account" })
                    }
                    var getData = {};
                    delete loginData['__v'];
                    getData = JSON.parse(JSON.stringify(loginData));
                    var generatedToken = loginData.generateJwt();
                    if (generatedToken !== '') {
                        var otherInfo = {
                            token: generatedToken,
                            deviceId: userData.deviceId ? userData.deviceId : null
                        }
                        if (_.merge(getData, otherInfo)) {
                            User.findOneAndUpdate({ _id: loginData._id }, { $set: { last_login: Date.now(), deviceId: userData.deviceId ? userData.deviceId : null } }, function (err, updatedData) {
                                if (err) {
                                    return res.json({ code: 301, status: "Error", message: "Authentication failed" });
                                }
                                else {   
                                    // Geofence.findOne({'is_deleted': false }, function (err, getUser) {
                                    //     getData.radius=getUser.radius;
                                        return res.json({ code: 200, status: "Success", message: "Login successfull", data: getData });
                                    //});
                                    
                                }
                            });
                        }
                    }

                } else {
                    return res.json({ code: 301, status: "Error", message: "Authentication failed" });
                }

            });
        } else {
            return res.json({ code: 301, status: "Error", message: "Authentication failed" });
        }
    });
}

var enableUser = function (req, res) {
    var userData = req.body ? req.body : '';
    if (userData) {
        User.findOne({ _id: userData.adminId, is_deleted: false }, function (err, adminData) {
            if (err) {
                console.log(err);
                return res.json({ code: 301, status: "Error", message: "Server error while fetching details" });
            }
            else {
                if (!_.isNull(adminData) && adminData.role == "0") {
                    User.update({ email: userData.email, is_deleted: false }, { $set: { status: 1 } }, function (err, updated) {
                        if (updated) {
                            return res.json({ code: 200, status: "Success", message: "User is successfully enabled" });
                        }
                        else {
                            return res.json({ code: 301, status: "Error", message: "Server error while fetching details" });
                        }
                    })
                }
                else {
                    return res.json({ code: 301, status: "Error", message: "Admin details does not match" });
                }
            }
        })
    }
    else {
        return res.json({ code: 301, status: "Error", message: "Send valid body parameters" });
    }
}

var forgotPassword = function (req, res) {
    console.log('forgot password');
    var data = req.body ? req.body : {};
    console.log('forgot password', data.email);
    if (data.email) {
        isEmailExist(data.email, function (exist) {

            if (exist) {
                var token = crypto.randomBytes(25).toString('hex');
                User.findOneAndUpdate({
                    email: data.email,
                    is_deleted: false
                }, { $set: { forgot_password_token: token } }, { new: true }, function (err, result) {

                    if (err) {
                        res.json({ status: 500, msg: constant.message.error_update_forget_token });
                    }
                    else {
                        res.json({ status: 200, message: 'token updated successfully', data: result });
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false,// use SSL
                            debug: true,
                            auth: {
                                user: 'ak56nit@gmail.com',
                                pass: 'Anmol_897'
                            }
                        });
                        var mailOptions = {
                            from: 'ak56nit@gmail.com',
                            to: data.email,
                            subject: 'forgot-pasword',
                            html: '<h5>`Hi Member;</h5><br>Please click on below link to reset password<br>' + constant.url.WEB + `/reset-password/` + result.forgot_password_token
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent:', info.messageId);
                        });
                    }
                })
            }
            else {
                res.json({ status: 404, msg: "invalid email" });
            }
        })
    } else {
        res.json({ status: 404, msg: "invalid email" });
    }

    function isEmailExist(email, callback) {
        var flag = false;
        User.findOne({ 'email': email, 'is_deleted': false }, function (err, user) {
            if (err) {
                res.json({ status: 0, msg: 'server error try again!' });
            } else {
                //  console.log('inside is Email in else');
                if (user) {
                    flag = true;
                } else {
                    flag = false;
                }
            }
            callback(flag);
        });
    }
}


// var getSuperAdmin = function (req, res) {
//     // User.findOne({_id:})
// }
//reset password for superadmin
var resetPassword = function (req, res) {
    var userData = req.body ? req.body : {};
    // console.log(' req.body', req.body);
    User.findOne({ 'forgot_password_token': userData.forgot_password_token, 'is_deleted': false }, function (err, token) {
        if (token) {
            var new_password = crypto.pbkdf2Sync(userData.password, token.salt, 1000, 64, 'sha1').toString('hex');
            //var getData = {};
            //console.log('token',token);
            // console.log('new_password',new_password);
            User.update({ _id: token._id }, { $set: { password: new_password } }, function (err, r) {
                if (err) {
                    console.log(err);
                }
                else {
                    User.update({ _id: token._id }, { $unset: { forgot_password_token: '' } }, function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("result", result);
                        }

                    });
                    res.json({ status: 200, message: "password changed succesfully" });
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,// use SSL
                        debug: true,
                        auth: {
                            user: 'ak56nit@gmail.com',
                            pass: 'Anmol_897'
                        }
                    });
                    var mailOptions = {
                        from: 'ak56nit@gmail.com',
                        to: token.email,
                        subject: 'reset password',
                        html: `<h3>Dear Member,</h3>
                          <p>
                           Your password has been changed. 
                          Thanks,
                           </p>
                          <p>
                          Water hular Team
                          </p >`
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent to: ', info.messageId);

                    });
                }
            });
        } else {
            return res.json({ status: 404 });
        }
    });
}
//changePassword password for superadmin
var changePassword = function (req, res) {
    var userData = req.body ? req.body : {};
    User.findById({ '_id': userData._id, 'is_deleted': false }, function (err, userDetails) {
        if (userDetails) {
            var old_password = crypto.pbkdf2Sync(userData.old_password, userDetails.salt, 1000, 64, 'sha1').toString('hex');
            var new_password = crypto.pbkdf2Sync(userData.new_password, userDetails.salt, 1000, 64, 'sha1').toString('hex');
            if (old_password != userDetails.password) {
                return res.json({ status: 301, message: "Old password does not match correctly" });
            }
            User.update({ _id: userDetails._id }, { $unset: { password: '' } }, function (err, r) {
                if (err) {
                    console.log(err);
                }
                else {
                    User.update({ _id: userDetails._id }, { $set: { password: new_password } }, function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("result", result);
                        }

                    });
                    res.json({ status: 200, message: "password changed succesfully" });
                }
            });
        } else {
            return res.json({ status: 404 });
        }
    });
}

var logout = function (req, res) {
    var userData = req.body ? req.body : {};
    if (userData) {
        User.findOneAndUpdate({ _id: userData.userId }, { $set: { deviceId: null } }, function (err, updated) {
            if (updated) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
            else {
                return res.json({ code: 200, status: "Success", message: "Logged out successfully" });
            }
        })
    }
    else {
        return res.json({ code: 301, status: "Error", message: "Send valid body parameters" });
    }
}

var fetchLog = function (req, res) {
    //  var companyData = req.body;
    var condition = {};
    var companyData = req.body ? req.body : {};
       console.log(companyData, "companyData")
    var offset = parseInt(companyData.offset);
    var rows = parseInt(companyData.rows);
   
    // if (companyData.role == "0") {
    //     condition = {
    //         is_deleted: false
    //     }
    // }
    // else if (companyData.role == "1") {
    //     condition = {
    //         is_deleted: false
    //     }
    // }
    // else if (companyData.role == "3") {
    //     condition = {
    //         is_deleted: false
    //     }
    // }
    storeTime.find({})
    .skip(offset)
    .limit(rows)
    .populate('userId', 'full_name')
    .populate('padId', 'pad_name')
    .exec(function (err, compData) {
            if (err) {
                console.log('err',err);
                return res.json({ code: 301, status: "Error", message: "Server error while fetching Log details" });
            }
            else {
                console.log('compData',compData);
                storeTime.count({ is_deleted: false}).exec(function (err, count) {
                    if (err) {
                        console.log(err);
                    } else {
                        //  console.log(count);
                    }
                    if (compData.length > 0) {
                        return res.json({ code: 200, status: "Success", count: count, data: compData });
                    }
                    else {
                        return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
                    }
                });
            }
        })
}


var fetchCompanies = function (req, res) {
    //  var companyData = req.body;
    var condition = {};
    var companyData = req.body ? req.body : {};
    var offset = parseInt(companyData.offset);
    var rows = parseInt(companyData.rows);
    //console.log(companyData, "companyData")
    if (companyData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (companyData.role == "1") {
        condition = {
            is_deleted: false,
            _id: companyData.companyId
        }
    }
    else if (companyData.role == "3") {
        condition = {
            is_deleted: false,
            _id: companyData.companyId
        }
    }
    User.find(condition)
        .skip(offset)
        .limit(rows)
        .exec(function (err, compData) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
            else {
                User.count(condition).exec(function (err, count) {
                    if (err) {
                        console.log(err);
                    } else {
                        //  console.log(count);
                    }
                    if (compData.length > 0) {
                        //console.log('compData', compData);
                        //console.log('count', count);
                        return res.json({ code: 200, status: "Success", count: count, data: compData });
                    }
                    else {
                        return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
                    }
                });
            }
        })
}

var fetchHaulers = function (req, res) {
    var hulerData = req.body;
    var offset = parseInt(hulerData.offset);
    var rows = parseInt(hulerData.rows);
    var condition = {};
    //console.log(hulerData, "hulerData")
    if (hulerData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (hulerData.role == "1") {
        condition = {
            is_deleted: false,
            _id: hulerData.companyId
        }
    }
    else if (hulerData.role == "3") {
        condition = {
            is_deleted: false,
            _id: hulerData.companyId
        }
    }
    User.find(condition)
        .skip(offset)
        .limit(rows)
        .exec(function (err, haulerData) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
            else {
                User.count(condition).exec(function (err, count) {
                    if (err) {
                        console.log(err);
                    } else {
                        //  console.log(count);
                    }
                    if (haulerData) {
                        return res.json({ code: 200, status: "Success", count: count, data: haulerData });
                    }
                    else {
                        return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
                    }
                });
            }
        })
}

//edit profile
var editProfile = function (req, res) {
    // console.log('in edit profile');
    var userData = req.body ? req.body : {};
    User.findOne({ '_id': userData.userId, 'is_deleted': false }, function (err, getUser) {
        if (getUser) {
            // console.log('getUser==',getUser);
            return res.json({ code: 200, status: "Success", data: getUser });
        }
        else {
            return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
        }
    });
}

var pushEnableDisable = function (req, res) {
    var userData = req.body ? req.body : {};
    if (userData.push_noti_flag) {
        User.findOneAndUpdate({ _id: userData.userId, is_deleted: false }, { $set: { push_noti_flag: userData.push_noti_flag } }, function (err, result) {
            if (result) {
                return res.json({ code: 200, status: "Success", message: "Push flag updated sucessfully" });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
            }
        });
    } else {
        return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
    }
}


var updateProfile = function (req, res) {
    var userData = req.body ? req.body : {};
    //console.log('userData==', userData);
    User.findOne({ 'email': userData.email, 'is_deleted': false }, function (err, getUser) {
        // console.log(getUser)
        if (getUser) {
            User.findOneAndUpdate({ _id: getUser._id, is_deleted: false }, { $set: { full_name: userData.full_name, phone_no: userData.phone_no } }, { new: true }, function (err, result) {
                if (err) {
                    return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
                } else {
                    if (userData.imgSrc) {
                        // console.log("I am in if")
                        base64Img.img(userData.imgSrc, 'public/images', getUser._id + "_user", function (err, filepath) {
                            // console.log(filepath,"dwdwdw");
                            if (err) {
                                return res.json({ code: 301, status: "Error", message: "Server error while processing user image" });
                            }
                            else {
                                var respath = filepath.slice(6);
                                User.findOneAndUpdate({ _id: getUser._id }, { $set: { company_logo: respath } }, { new: true }, function (err, imageupdated) {
                                    if (err) {
                                        return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
                                    }
                                    else {
                                        return res.json({ code: 200, status: "Success", message: "user profile updated successfully", data: imageupdated });
                                    }
                                })
                            }
                        });
                    }
                    else {
                        // console.log("I am in else")
                        return res.json({ code: 200, status: "Success", message: "user profile updated successfully", data: result });
                    }
                }
            });
        }
        else {
            return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
        }
    });
}

var disableUser = function (req, res) {
    let userId = req.body.userId;
    User.update({ _id: userId }, { $set: { status: 0 } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}

var enableUser = function (req, res) {
    let userId = req.body.userId;
    User.update({ _id: userId }, { $set: { status: 1 } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}

var deleteUser = function (req, res) {
    let userId = req.body.userId;
    User.update({ _id: userId }, { $set: { is_deleted: true } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}

//pagination

var fetchCompanyUsers = function (req, res) {
    //var companyUserData = req.body;
    var condition = {};
    var companyUserData = req.body ? req.body : {};
    var offset = parseInt(companyUserData.offset);
    var rows = parseInt(companyUserData.rows);
    // console.log(companyUserData, "companyUserData")
    if (companyUserData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (companyUserData.role == "1") {
        condition = {
            is_deleted: false,
            _id: companyUserData.companyId
        }
    }
    else if (companyUserData.role == "3") {
        condition = {
            is_deleted: false,
            _id: companyUserData.companyId
        }
    }
    User.find(condition)
        .skip(offset)
        .limit(rows)
        .exec(function (err, compUserData) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
            else {
                User.count(condition).exec(function (err, count) {
                    if (err) {
                        console.log(err);
                    } else {
                        //console.log(count);
                    }
                    if (compUserData.length > 0) {
                        return res.json({ code: 200, status: "Success", count: count, data: compUserData });
                    }
                    else {
                        return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
                    }
                });
            }

        })
}

var fetchHaulersUser = function (req, res) {
    var hulerData = req.body ? req.body : {};
    var offset = parseInt(hulerData.offset);
    var rows = parseInt(hulerData.rows);
    //var hulerData = req.body;
    var condition = {};
    if (hulerData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (hulerData.role == "1") {
        condition = {
            is_deleted: false,
            _id: hulerData.companyId
        }
    }
    else if (hulerData.role == "3") {
        condition = {
            is_deleted: false,
            _id: hulerData.companyId
        }
    }

    User.find(condition)
        .skip(offset)
        .limit(rows)
        .exec(function (err, haulerUserData) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
            else {
                User.count(condition).exec(function (err, count) {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(count);
                    }
                    if (haulerUserData.length > 0) {
                        return res.json({ code: 200, status: "Success", count: count, data: haulerUserData });
                    }
                    else {
                        return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
                    }
                });
            }
        })
}


var addgeofencing = function (req, res) {
        var geofenceData = req.body ? req.body : {};
        console.log('geofenceData',geofenceData);
        const geofence = new Geofence(geofenceData);
        geofence.save()
            .then(savedData => {
                res.json({ code: 200, data: savedData, message: "geofence is save successfully." })
            })
            .catch(e => { console.log(e); res.json({ code: 500, message: "Internal server error" }); });
   
  }
  var storedtime = function (req, res) {
    var timetakenData = req.body ? req.body : {};
    const storetime = new storeTime(timetakenData);
    storetime.save()
        .then(savedData => {
            res.json({ code: 200, data: savedData, message: "time is save successfully." })
        })
        .catch(e => { console.log(e); res.json({ code: 500, message: "Internal server error" }); });

}
var fetchgeofencing = function (req, res) {
    Geofence.findOne({"is_deleted":false}).exec(function (err, geofenceData) {
        console.log('geofenceData.length',geofenceData);
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            console.log(' inside else geofenceData==',geofenceData);
            if (geofenceData) {
                return res.json({ code: 200, status: "Success",data: geofenceData });
            }
            else {
           
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }

        }
    })
}

var updateRadius = function (req, res) {
    let radiusData = req.body;
   // console.log('radiusData._id111==',radiusData._id);
   // console.log('radiusData._id222==',radiusData);
    // Tanks.update({ _id: userData._id,is_deleted: false }, { $set: { is_deleted: true } }, function (err, result) {
        Geofence.findOneAndUpdate({ _id:radiusData._id, is_deleted: false }, { $set: {radius: radiusData.radius } }, { new: true }, function (err, result) {

        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching radius details" });
        }
        else {
            // console.log('result==',result);
            return res.json({ code: 200, status: "Success", message: "radius updated succesfully" });
        }
    })
}

var uploadImage = function (req, res) {
    var userData = req.body ? req.body : '';
    if (userData && userData.userId && userData.imgSrc) {
        base64Img.img(req.body.imgSrc, 'public/images', 'user1', function (err, filepath) {
            console.log(err, filepath)
        });
        base64Img.img(userData.imgSrc, 'public/images', userData.userId + "_user", function (err, filepath) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while processing user image" });
            }
            else {
                var respath = filepath.slice(6);
                User.findOneAndUpdate({ _id: userData.userId }, { $set: { company_logo: respath } }, function (err, imageupdated) {
                    if (err) {
                        return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
                    }
                    else {
                        return res.json({ code: 200, status: "Success", message: "Image uploaded successfully", data: imageupdated });
                    }
                })
            }
        });
    }
    else {
        return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
    }
}

var updateLongLat = function (req, res) {
    var userData = req.body ? req.body : {};
    if (userData.lat == null && userData.long == null) {
        return res.json({ code: 301, status: "Error", message: "lat long Parameters missing" });
    }
    User.findOne({ '_id': userData.userId, 'is_deleted': false }, function (err, getUser) {
        if (getUser) {
            User.update({ _id: getUser._id, is_deleted: false }, { $set: { lat: userData.lat, long: userData.long } }, function (err, result) {
                if (err) {
                    return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
                } else {
                    return res.json({ code: 200, status: "success", message: " Lat-long updated successfully" });
                }
            });
        }
        else {
            return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
        }
    });

}

exports.addgeofencing = addgeofencing;
exports.pushEnableDisable = pushEnableDisable;
exports.updateLongLat = updateLongLat;
exports.updateProfile = updateProfile;
exports.editProfile = editProfile;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.changePassword = changePassword;
exports.login = login;
exports.signup = signup;
exports.enableUser = enableUser;
exports.logout = logout;
exports.fetchCompanies = fetchCompanies;
exports.fetchHaulers = fetchHaulers;
exports.disableUser = disableUser;
exports.enableUser = enableUser;
exports.deleteUser = deleteUser;
exports.fetchCompanyUsers = fetchCompanyUsers;
exports.fetchHaulersUser = fetchHaulersUser;
exports.uploadImage = uploadImage;
exports.fetchgeofencing = fetchgeofencing;
exports.updateRadius = updateRadius;
exports.storedtime = storedtime;
exports.fetchLog = fetchLog;