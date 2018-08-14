'use strict'
var mongoose = require('mongoose');
var constant = require('../../config/constants');
var Tanks = mongoose.model('tank');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;
var crypto = require('crypto');
var _ = require('lodash');
var QRCode = require('qrcode');
var generator = require('generate-serial-number');
var multer = require("multer");
var csv = require('csv-parser');
var fs = require('fs');
var json2csv = require('json2csv');
var User = mongoose.model('users');
var Pads = mongoose.model('pads');
var Geofence = mongoose.model('geofence');
var storeTime = mongoose.model('storetime');



//sonu code for Add tank details 
var addTanks = function (req, res) {
    // var serialNumber = generator.generate(10);
    //req.body.serial_no = serialNumber;
    var tank = new Tanks(req.body);
    var outputJson = new Object();
    // console.log('req.body in save tank====',req.body);
    Tanks.findOne({ 'tank_name': req.body.tank_name, 'is_deleted': false }, function (err, addTank) {
        if (err) {
            outputJson = { code: 301, status: "Failed", message: 'Server error while fetching tank details', };
            return res.json(outputJson);
        }
        else {
            if (!_.isNull(addTank)) {
                outputJson = { code: 201, status: "Failed", message: 'tank name already exists' };
                return res.json(outputJson);
            }
            else {
                tank.save(function (err, tank) {
                    if (err) {
                        console.log(err);
                        outputJson = { code: 201, status: "Failed", message: 'tank name is missing' };
                        return res.json(outputJson);
                    } else {
                        outputJson = { code: 200, status: "Success", message: 'tank Details inserted successfully', data: tank };
                        var user_id = tank._id.toString();
                        var opts = {
                            errorCorrectionLevel: 'H',
                            version: 10,
                            type: 'image/jpeg',
                            rendererOpts: {
                                quality: 1.0
                            }
                        }

                        QRCode.toDataURL(user_id, opts, function (err, url) {
                            // console.log('url====>>>', url);
                            Tanks.findOneAndUpdate({ _id: tank._id }, { $set: { qrcode_url: url } }, function (err, result) {
                                if (err) {
                                    outputJson = { code: 201, status: "Failed", message: 'id is missing' };
                                    return res.json(outputJson);
                                } else {
                                    outputJson = { code: 200, status: "Success", message: 'QR code generated successfully', data: result };
                                    return res.json(outputJson);
                                }
                            });
                        });
                        // return res.json(outputJson);
                    }
                });
            }
        }
    });
}

var fetchTanks = function (req, res) {
    var tankData = req.body;
    var offset = parseInt(tankData.offset);
    var rows = parseInt(tankData.rows);
    console.log('data==', tankData)
    var condition = {};
    if (tankData.role == "0") {
        condition = {
            is_deleted: false
        }
    }

    else if (tankData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    else if (tankData.role == "2") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    else if (tankData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    //   console.log('....',condition)
    Tanks.find(condition)
        .skip(offset)
        .limit(rows)
        .populate('padId', '_id pad_name')
        .populate('wellId', '_id well_name')
        .exec(function (err, tanksData) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
            }
            else {
                //  console.log('tanksData',tanksData);
                // Tanks.populate(tanksData, { path: 'padId', select: 'pad_name'}, function (err, data) {                 
                if (tanksData) {
                    Tanks.count(condition).exec(function (err, count) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            return res.json({ code: 200, status: "Success", count: count, data: tanksData });

                        }
                    });
                    // });
                }
                else {
                    return res.json({ code: 301, status: "Error", message: "Server error while fetching tanks details" });
                }
            }
        })
}

var verifyTankQRcode = function (req, res) {
    var tank = new Tanks(req.body);
    var outputJson = new Object();
    var tankData = req.body ? req.body : {};
    var queryArr = [
        { $match: { _id: ObjectId(tankData._id), is_deleted: false } },
        { $lookup: { from: "users", localField: "companyId", foreignField: "_id", as: "companyData" } },
        { $unwind: { "path": "$companyData", "preserveNullAndEmptyArrays": true } },
        { $lookup: { from: "pads", localField: "padId", foreignField: "_id", as: "padsData" } },
        { $unwind: { "path": "$padsData", "preserveNullAndEmptyArrays": true } }
    ];
    Tanks.aggregate(queryArr).exec(function (err, tanksData) {
        if (err) {
            outputJson = { code: 301, status: "Failed", message: 'Invalid QR code ' };
            return res.json(outputJson);
        }
        else {
            var d = new Date,
            dformat = [(d.getMonth()+1),
                       d.getDate(),
                       d.getFullYear()].join('/') +' ' +
                      [d.getHours(),
                       d.getMinutes(),
                       d.getSeconds()].join(':');
            console.log('tanksData==>>',tanksData)
            console.log('2',tanksData.padData)
            var timetakenData = {};
            timetakenData.entry_time =dformat;
            timetakenData.userId =tankData.userId;

            timetakenData.padId =tanksData[0].padsData._id;

            const storetime = new storeTime(timetakenData);
            storetime.save()
                .then(savedData => {
                    //res.json({ code: 200, data: savedData, message: "time is save successfully." })
                })
                .catch(e => {
                    console.log(e);
                    res.json({ code: 500, message: "Internal server error" });
                });

            // }

            if (tanksData.length > 0) {
                Geofence.findOne({ 'is_deleted': false }, function (err, getUser) {
                    if (err) {
                        outputJson = { code: 200, status: "Error", message: 'radius not found' };
                        return res.json(outputJson);

                    } else {
                        tanksData.map(function (item) {
                            item.radius = getUser.radius;
                            return item;

                        });
                        outputJson = { code: 200, status: "Success", message: 'QR code matched', data: tanksData };
                        return res.json(outputJson);
                    }
                });

            }
            else {
                Geofence.findOne({ 'is_deleted': false }, function (err, getUser) {
                    if (err) {
                        outputJson = { code: 200, status: "Error", message: 'radius not found' };
                        return res.json(outputJson);

                    } else {
                        tanksData.map(function (item) {
                            item.radius = getUser.radius;
                            return item;

                        });
                        outputJson = { code: 301, status: "Failed", message: 'Body parameters are missing', data: tanksData };
                        return res.json(outputJson)
                    }
                });
            }
        }
    })
    // Tanks.findOne({ '_id': tankData._id, 'is_deleted': false }, function (err, tankDetails) {
    //     if (err) {
    //         outputJson = { code: 301, status: "Failed", message: 'Invalid QR code ' };
    //         return res.json(outputJson);
    //     }
    //     else {
    //         if (tankDetails) {
    //             outputJson = { code: 200, status: "Success", message: 'QR code matched', data: tankDetails };
    //             return res.json(outputJson);
    //         }
    //     }
    // });
}

var importTanksCsv = function (req, res) {
    var tankArr = new Array();
    fs.createReadStream(req.files[0].destination + req.files[0].filename)
        .pipe(csv({
            // headers: ['tank_name', 'tank_no', 'lat', 'long', 'volume', 'type', 'companyId', 'padId'] // Specifing the headers
        }))
        .on('data', function (data) {

            tankArr.push({
                tank_name: data.tank_name,
                tank_no: data.tank_no,
                lat: data.lat,
                long: data.long,
                volume: data.volume,
                type: data.type,
                padName: data.padName
            });
        })
        .on('end', function (data) {
            // console.log(tankArr);
            req.body = {};
            saveTanks(tankArr, req, res)
        })
}

function saveTanks(tankArr, req, res) {
    console.log('save tank');
    for (var i = 0; i < tankArr.length; i++) {
        // console.log(i,tankArr[i])
        // console.log(tankArr[i])
        req.body = tankArr[i];
        addTanksByCsv(req, res);
        req.body = {};
        if (i == tankArr.length - 1) {
            res.json({ code: 200, message: "Csv uploaded successfully" });
        }
    }
}

var addTanksByCsv = function (req, res) {
    var serialNumber = generator.generate(10);
    req.body.serial_no = serialNumber;
    var tanksData = req.body;
    //console.log("Req body", req.body)
    if (req.body.padName) {
        Pads.findOne({ pad_name: req.body.padName }, function (err, padsData) {
            if (err) {

            }
            else {
                console.log('in add tank csvpadsData', padsData);
                if (!_.isNull(padsData)) {
                    tanksData.companyId = padsData.companyId;
                    tanksData.padId = padsData._id;
                    var tank = new Tanks(tanksData);
                    var outputJson = new Object();
                    // console.log('hiiii');
                    Tanks.findOne({ 'tank_name': tanksData.tank_name, 'is_deleted': false }, function (err, addTank) {
                        if (err) {
                            outputJson = { code: 301, status: "Failed", message: 'Server error while fetching tank details', };
                            // return res.json(outputJson);
                        }
                        else {
                            if (!_.isNull(addTank)) {
                                outputJson = { code: 201, status: "Failed", message: 'tank name already exists' };
                                // return res.json(outputJson);
                            }
                            else {
                                tank.save(function (err, tank) {
                                    if (err) {
                                        console.log(err);
                                        outputJson = { code: 201, status: "Failed", message: 'tank name is missing' };
                                        // return res.json(outputJson);
                                    } else {
                                        outputJson = { code: 200, status: "Success", message: 'tank Details inserted successfully', data: tank };
                                        var user_id = tank._id.toString();
                                        //console.log('user_id==', user_id);
                                        QRCode.toDataURL(user_id, function (err, url) {
                                            // console.log('inside');
                                            Tanks.findOneAndUpdate({ _id: tank._id }, { $set: { qrcode_url: url } }, function (err, result) {
                                                if (err) {
                                                    outputJson = { code: 201, status: "Failed", message: 'id is missing' };
                                                    // return res.json(outputJson);
                                                } else {
                                                    outputJson = { code: 200, status: "Success", message: 'QR code generated successfully', data: result };
                                                    // return res.json(outputJson);
                                                    // console.log("saved");
                                                }
                                            });
                                        });
                                        // return res.json(outputJson);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        })
    }

}

var exportTankCsv = function (req, res) {
    var email = req.body.email;
    var outputJson;
    var tankData = req.body;
    var condition;
    var changeDateFormat = [];
    if (tankData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (tankData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    else if (tankData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    console.log('tankData===>>', tankData);
    var fields = ['tank_name', 'tank_no', 'lat', 'long', 'volume', 'type', 'companyId.company_name', 'padId.pad_name', 'created_at'];
    Tanks.find(condition)
        .populate('companyId', 'company_name')
        .populate('padId', 'pad_name').lean().exec(function (err, tanksData) {
            if (err) {
                outputJson = { code: 301, status: "Failed", message: 'Server error while fetching tank details', };
                return res.json(outputJson);
            }
            else {
                console.log('tanksData in export Csv', tanksData);
                tanksData.forEach((item, index) => {
                    // let changeDate= item.created_at
                    let date = new Date(item.created_at)

                    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

                    // date = date.toISOString().slice(0,10);
                    // tanksData.push({"created_at":date});
                    item.created_at = date;
                    console.log('date==', date);
                });

                try {
                    //console.log('fields===',fields);
                    var result = json2csv({ data: tanksData, fields: fields });
                    console.log(result);
                    fs.writeFile('tank.csv', result, function (err) {
                        if (err) {
                            outputJson = { code: 301, status: "Failed", message: 'Server error while fetching tank details', };
                            return res.json(outputJson);
                        }
                        console.log('file saved');
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
                            to: email,
                            subject: 'Tanks Csv',
                            html: `<h3>Dear Member,</h3>
                          <p>
                           Please find Tanks Data Csv attached. 
                          Thanks,
                           </p>
                          <p>
                          Water hular Team
                          </p >`,
                            attachments: [
                                {   // utf-8 string as an attachment
                                    filename: 'tank.csv',
                                    path: 'tank.csv'
                                },
                            ]

                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            console.log("I am in email", error, info);
                            if (error) {
                                outputJson = { code: 301, status: "Failed", message: 'Server error while sending email or may be your email is incorrect', };
                                return res.json(outputJson);
                            } else {
                                outputJson = { code: 200, status: "Success", message: 'Tanks Csv is successfully sent to the email' };
                                return res.json(outputJson);
                            }
                            // console.log("saved");
                        });
                    });
                } catch (err) {
                    outputJson = { code: 301, status: "Failed", message: 'Server error while fetching tank details', };
                    return res.json(outputJson);
                }
            }
        })
}

// var fetchDaysForChart = function (req, res) {
//     var month = new Date().getMonth() + 1;
//     var year = new Date().getFullYear();
//     var today = new Date().getDate();
//     var tankData = req.body;
//     // console.log(tankData);

//     var condition = {};
//     if (tankData.role == "0") {
//         condition = {
//             is_deleted: false,
//             month: month,
//             year: year
//         }
//     }
//     else if (tankData.role == "1") {
//         condition = {
//             is_deleted: false,
//             companyId: ObjectId(tankData.companyId),
//             month: month,
//             year: year
//         }
//     }
//     else if (tankData.role == "3") {
//         condition = {
//             is_deleted: false,
//             companyId: ObjectId(tankData.companyId),
//             month: month,
//             year: year
//         }
//     }

//     // console.log(condition);
//     Tanks.aggregate([
//         {
//             $project: {
//                 year: { $year: "$created_at" },
//                 month: { $month: "$created_at" },
//                 volume: 1,
//                 created_at: 1,
//                 is_deleted: 1,
//                 companyId: 1
//             }
//         },

//         { $match: condition },
//         {
//             $group: {
//                 _id: { $dayOfMonth: "$created_at" },
//                 volume: { $sum: "$volume" },
//                 created_at: { $first: "$created_at" },
//                 is_deleted: { $first: "$is_deleted" },
//                 month: { $first: "$month" }

//             }
//         }]).exec(function (err, tanksData) {
//             // console.log('tankData in daysfor chart==', tanksData);
//             if (err) {
//                 return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
//             }
//             else {
//                 if (tanksData) {

//                     return res.json({ code: 200, status: "Success", data: tanksData });
//                 }
//                 else {
//                     return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
//                 }
//             }
//         })
// }
// var fetchMonthChart = function (req, res) {
//     var month = new Date().getMonth() + 1;
//     var year = new Date().getFullYear();
//     var today = new Date().getDate();
//     var tankData = req.body;
//     var condition = {};
//     //var hours = new
//     if (tankData.role == "0") {
//         condition = {
//             is_deleted: false,
//             year: year
//         }
//     }
//     else if (tankData.role == "1") {
//         condition = {
//             is_deleted: false,
//             companyId: ObjectId(tankData.companyId),
//             year: year
//         }
//     }
//     else if (tankData.role == "3") {
//         condition = {
//             is_deleted: false,
//             companyId: ObjectId(tankData.companyId),
//             year: year
//         }
//     }
//     Tanks.aggregate(
//         [
//             {
//                 $project: {
//                     year: { $year: "$created_at" },
//                     month: { $month: "$created_at" },
//                     volume: 1,
//                     created_at: 1,
//                     is_deleted: 1,
//                     companyId: 1
//                 }
//             },
//             { $match: condition },
//             {
//                 $group: {
//                     _id: { $month: "$created_at" },
//                     volume: { $sum: "$volume" }
//                 }
//             },

//         ]

//     ).exec(function (err, tanksData) {
//         // console.log('tankData in Month==', tanksData);
//         if (err) {
//             return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
//         }
//         else {
//             // console.log('tanksData', tanksData);
//             if (tanksData) {

//                 return res.json({ code: 200, status: "Success", data: tanksData });
//             }
//             else {
//                 return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
//             }
//         }
//     })
// }
// var yearChart = function (req, res) {
//     var month = new Date().getMonth() + 1;
//     var year = new Date().getFullYear();
//     var today = new Date().getDate();
//     var tankData = req.body;
//     var condition = {};
//     if (tankData.role == "0") {
//         condition = {
//             is_deleted: false,
//             year: year
//         }
//     }
//     else if (tankData.role == "1") {
//         condition = {
//             is_deleted: false,
//             companyId: ObjectId(tankData.companyId),
//             year: year
//         }
//     }
//     else if (tankData.role == "3") {
//         condition = {
//             is_deleted: false,
//             companyId: ObjectId(tankData.companyId),
//             year: year
//         }
//     }
//     Tanks.aggregate([
//         {
//             $project: {
//                 year: { $year: "$created_at" },
//                 volume: 1,
//                 created_at: 1,
//                 is_deleted: 1,
//                 companyId: 1
//             }
//         },
//         { $match: condition },
//         {
//             $group: {
//                 _id: { $year: "$created_at" },
//                 volume: { $sum: "$volume" }
//             }
//         }, { $sort: { _id: 1 } }

//     ]).exec(function (err, tanksData) {
//         // console.log('tanksData in year===', tanksData)
//         if (err) {
//             return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
//         }
//         else {
//             if (tanksData) {
//                 //console.log(tanksData)
//                 return res.json({ code: 200, status: "Success", data: tanksData });
//             }
//             else {
//                 return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
//             }
//         }
//     })
// }
var totalVolume = function (req, res) {
    // console.log('total volume');
    var tankData = req.body;
    var condition = {};
    if (tankData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (tankData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: ObjectId(tankData.companyId)
        }
    }
    else if (tankData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: ObjectId(tankData.companyId)
        }
    }
    Tanks.aggregate(
        [
            {
                $project: {
                    year: { $year: "$created_at" },
                    month: { $month: "$created_at" },
                    volume: 1,
                    created_at: 1,
                    is_deleted: 1,
                    companyId: 1
                }
            },
            { $match: condition },
            {
                $group: {
                    _id: null,
                    volume: { $sum: "$volume" }
                }
            },

        ]
    ).exec(function (err, tanksData) {
        // console.log('tanksData', tanksData);
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
        }
        else {
            if (tanksData) {

                return res.json({ code: 200, status: "Success", data: tanksData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
}

// var totalVolume = function (req, res) {
//     console.log("@@@@@@@@@@@@@@@@------------totalVolume--------------@@@@@@@@@@@");
//     var tankData = req.body ? req.body : {};
//     var condition = {};
//     if (tankData.role == "0") {
//         condition = {
//             is_deleted: false
//         }
//     }
//     else if (tankData.role == "1") {
//         condition = {
//             is_deleted: false,
//             companyId: tankData.companyId
//         }
//     }
//     else if (tankData.role == "3") {
//         condition = {
//             is_deleted: false,
//             companyId: tankData.companyId
//         }
//     }

//     var loginCompanyId = tankData.companyId;
//     var tankCon = {
//         companyId : loginCompanyId,
//         tank_status : true,
//         is_deleted : false
//     };
//     var tankFields = {
//         _id : true
//     };

//     Tanks.find(tankCon , tankFields , function(err , tankIds){
//         if(!err) {
//             console.log("@@@@@@@@@@@@@@@@----------------",tankIds);
//             var tempArr = [];
//             for(var loop = 0; loop < tankIds.length; loop++){
//                 tempArr.push(tankIds[loop]._id);
//             }


//             Tanks.aggregate([
//                 { $match: { _id: {$in : tempArr}, is_deleted: false } },
//                 {

//                     $lookup:
//                         {
//                             from: "transactiondetails",
//                             localField: "_id",
//                             foreignField: "tank_id",
//                             as: "transactionData"
//                         }
//                 },
//                 { $unwind: { "path": "$transactionData", "preserveNullAndEmptyArrays": true } }

//             ]).exec(function (err, tanksData) {
//                  console.log('tanksData for totalvolumeData==', tanksData);
//                 if (err) {
//                     return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
//                 }
//                 else {
//                     if (tanksData) {

//                         return res.json({ code: 200, status: "Success", data: tanksData });
//                     }
//                     else {
//                         return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
//                     }
//                 }
//             })
//         }
//         else{
//             console.log("@@@@@@@@ERROR---------",err);

//         }
//     });
// }

var singleTankVolume = function (req, res) {
    console.log("singleTankVolume");
    var tankData = req.body ? req.body : {};
    var condition = {};
    console.log('tankData==', tankData);
    if (tankData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (tankData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    else if (tankData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    Tanks.aggregate([
        { $match: { _id: ObjectId(tankData.tankId), is_deleted: false } },
        {

            $lookup:
                {
                    from: "transactiondetails",
                    localField: "_id",
                    foreignField: "tank_id",
                    as: "transactionData"
                }
        },
        { $unwind: { "path": "$transactionData", "preserveNullAndEmptyArrays": true } }

    ]).exec(function (err, tanksData) {
        // console.log('tanksData for pichart', tanksData);
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
        }
        else {
            if (tanksData) {

                return res.json({ code: 200, status: "Success", data: tanksData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
}

// var singleTankVolumeForLine = function (req, res) {
//     var month = new Date().getMonth() + 1;
//     var year = new Date().getFullYear();
//     var today = new Date().getDate();
//     var tankData = req.body ? req.body : {};
//     //console.log('tankData.tankId', tankData.tankId);
//     var condition = {};
//     if (tankData.role == "0") {
//         condition = {
//             is_deleted: false
//         }
//     }
//     else if (tankData.role == "1") {
//         condition = {
//             is_deleted: false,
//             companyId: tankData.companyId
//         }
//     }
//     else if (tankData.role == "3") {
//         condition = {
//             is_deleted: false,
//             companyId: tankData.companyIdf
//         }
//     }
//     Tanks.aggregate(
//         [
//             {
//                 $project: {
//                     year: { $year: "$created_at" },
//                     month: { $month: "$created_at" },
//                     volume: 1,
//                     created_at: 1,
//                     is_deleted: 1
//                 }
//             },
//             { $match: { "_id": ObjectId(tankData.tankId), is_deleted: false, month: month, year: year } },
//             {
//                 $group: {
//                     _id: { $dayOfMonth: "$created_at" },
//                     volume: { $first: "$volume" },
//                 }
//             },

//         ]
//     ).exec(function (err, tanksData) {
//         // console.log('tanksData in singleTankVolumeForLine', tanksData);
//         if (err) {
//             return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
//         }
//         else {
//             if (tanksData) {

//                 return res.json({ code: 200, status: "Success", data: tanksData });
//             }
//             else {
//                 return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
//             }
//         }
//     })
// }
// var singleTankVolumeForLineMonth = function (req, res) {
//     var month = new Date().getMonth() + 1;
//     var year = new Date().getFullYear();
//     var today = new Date().getDate();
//     var tankData = req.body ? req.body : {};
//     //console.log('tankData.tankId', tankData.tankId);
//     var condition = {};
//     if (tankData.role == "0") {
//         condition = {
//             is_deleted: false
//         }
//     }
//     else if (tankData.role == "1") {
//         condition = {
//             is_deleted: false,
//             companyId: tankData.companyId
//         }
//     }
//     else if (tankData.role == "3") {
//         condition = {
//             is_deleted: false,
//             companyId: tankData.companyIdf
//         }
//     }
//     Tanks.aggregate(
//         [
//             {
//                 $project: {
//                     year: { $year: "$created_at" },
//                     volume: 1,
//                     created_at: 1,
//                     is_deleted: 1
//                 }
//             },
//             { $match: { "_id": ObjectId(tankData.tankId), is_deleted: false, year: year } },
//             {
//                 $group: {
//                     _id: { $month: "$created_at" },
//                     volume: { $sum: "$volume" }
//                 }
//             },

//         ]
//     ).exec(function (err, tanksData) {
//         // console.log('tanksData in singleTankVolumeForLineMonth', tanksData);
//         if (err) {
//             return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
//         }
//         else {
//             if (tanksData) {

//                 return res.json({ code: 200, status: "Success", data: tanksData });
//             }
//             else {
//                 return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
//             }
//         }
//     })
// }
// var singleTankVolumeForLineYear = function (req, res) {
//     var month = new Date().getMonth() + 1;
//     var year = new Date().getFullYear();
//     var today = new Date().getDate();
//     var tankData = req.body ? req.body : {};
//     // console.log('tankData.tankId', tankData.tankId);
//     var condition = {};
//     if (tankData.role == "0") {
//         condition = {
//             is_deleted: false
//         }
//     }
//     else if (tankData.role == "1") {
//         condition = {
//             is_deleted: false,
//             companyId: tankData.companyId
//         }
//     }
//     else if (tankData.role == "3") {
//         condition = {
//             is_deleted: false,
//             companyId: tankData.companyIdf
//         }
//     }
//     Tanks.aggregate(
//         [
//             { $match: { "_id": ObjectId(tankData.tankId), is_deleted: false } },
//             {
//                 $group: {
//                     _id: { $year: "$created_at" },
//                     volume: { $sum: "$volume" }
//                 }
//             },

//         ]
//     ).exec(function (err, tanksData) {
//         // console.log('tanksData in LineYear', tanksData);
//         if (err) {
//             return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
//         }
//         else {
//             if (tanksData) {

//                 return res.json({ code: 200, status: "Success", data: tanksData });
//             }
//             else {
//                 return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
//             }
//         }
//     })
// }
//edit Tanks
var editTanks = function (req, res) {
    var userData = req.body ? req.body : {};
    Tanks.findOne({ '_id': userData.userId, 'is_deleted': false }, function (err, tankDetails) {
        if (tankDetails) {
            return res.json({ code: 200, status: "Success", data: tankDetails });
        }
        else {
            return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
        }
    });
}

var deleteTank = function (req, res) {
    let userId = req.body.userId;
    Tanks.update({ _id: userId }, { $set: { is_deleted: true } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}

var updateTank = function (req, res) {
    let userData = req.body;
    // console.log('userData==',userData);
    // Tanks.update({ _id: userData._id,is_deleted: false }, { $set: { is_deleted: true } }, function (err, result) {
    Tanks.findOneAndUpdate({ _id: userData._id, is_deleted: false }, { $set: { tank_name: userData.tank_name, volume: userData.volume, companyId: userData.companyId, padId: userData.padId } }, { new: true }, function (err, result) {

        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            console.log('result==', result);
            return res.json({ code: 200, status: "Success", message: "tank updated succesfully" });
        }
    })
}

var disableTank = function (req, res) {
    let tankId = req.body.tankId;
    // console.log('tankId==',tankId);
    Tanks.update({ _id: tankId }, { $set: { tank_status: false } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            console.log('disable result==', result);
            return res.json({ code: 200, status: "Success" });
        }
    })
}

var enableTank = function (req, res) {
    let tankId = req.body.tankId;
    // console.log('tankId==',tankId);
    Tanks.update({ _id: tankId }, { $set: { tank_status: true } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            console.log('result==', result);
            return res.json({ code: 200, status: "Success" });
        }
    })
}


var fetchImages = function (req, res) {
    var tankId = req.body.tankId;
    console.log('tankId===in controller', tankId);
    Tanks.find({ is_deleted: false, _id: tankId })
        // .populate('tank_id', '_id serial_no')
        // .populate('hauler_id', '_id full_name')
        .exec(function (err, tankData) {
            //console.log('tankData', tankData);
            if (err) {
                console.log('err', err);
                return res.json({ code: 301, status: "Error", message: "Server error while fetching tankData details" });
            }
            else {
                // console.log('tankData==in fetch image', tankData)
                if (tankData) {

                    return res.json({ code: 200, status: "Success", data: tankData });
                }
                else {
                    return res.json({ code: 301, status: "Error", message: "Server error while fetching tankData details" });
                }
            }
        })
}

var viewImage = function (req, res) {
    var userData = req.body ? req.body : {};
    Tanks.findOne({ '_id': userData.userId, 'is_deleted': false }, function (err, tankDetails) {
        if (tankDetails) {
            return res.json({ code: 200, status: "Success", data: tankDetails });
        }
        else {
            return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
        }
    });
}
var fetchTrancId = function (req, res) {
    var userData = req.body ? req.body : {};
    console.log('userData in imgid', userData);
    Tanks.findOne({ '_id': userData.userId, 'is_deleted': false }, function (err, tankDetails) {
        if (tankDetails) {
            return res.json({ code: 200, status: "Success", data: tankDetails });
        }
        else {
            return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
        }
    });
}


var totalTanks = function (req, res) {
    var tankData = req.body.data;
    var condition = {};
    //   var changeDateFormat=[];
    if (tankData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (tankData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    else if (tankData.role == "2") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    else if (tankData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    //console.log('condition',condition);
    Tanks.find(condition).count().exec(function (err, tanksData) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
        }
        else {
            if (tanksData) {
                return res.json({ code: 200, status: "Success", data: tanksData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
            }
        }
    })
}

exports.totalTanks = totalTanks;

exports.fetchTrancId = fetchTrancId;
exports.viewImage = viewImage;
exports.fetchImages = fetchImages;
exports.enableTank = enableTank;
exports.disableTank = disableTank;
exports.updateTank = updateTank;
exports.deleteTank = deleteTank;
exports.editTanks = editTanks;
// exports.singleTankVolumeForLineYear = singleTankVolumeForLineYear;
// exports.singleTankVolumeForLineMonth = singleTankVolumeForLineMonth;
// exports.singleTankVolumeForLine = singleTankVolumeForLine;
exports.singleTankVolume = singleTankVolume;
exports.totalVolume = totalVolume;
// exports.yearChart = yearChart;
// exports.fetchMonthChart = fetchMonthChart;
// exports.fetchDaysForChart = fetchDaysForChart;
exports.verifyTankQRcode = verifyTankQRcode;
exports.addTanks = addTanks;
exports.fetchTanks = fetchTanks;
exports.importTanksCsv = importTanksCsv;
exports.exportTankCsv = exportTankCsv;