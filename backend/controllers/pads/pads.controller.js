'use strict'
var mongoose = require('mongoose');
var constant = require('../../config/constants');
var Pads = mongoose.model('pads');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;
var crypto = require('crypto');
var _ = require('lodash');
var multer = require("multer");
var csv = require('csv-parser');
var fs = require('fs');
var json2csv = require('json2csv');
var User = mongoose.model('users');
var Pads = mongoose.model('pads');
var Tanks = mongoose.model('tank');

//sonu code for Add pad details 
var addPad = function (req, res) {

    req.body.position[0] = parseFloat(req.body.long);
    req.body.position[1] = parseFloat(req.body.lat);
    console.log('req.body', req.body);
    var pad = new Pads(req.body);
    var outputJson = new Object();

    Pads.findOne({ 'pad_name': req.body.pad_name, 'is_deleted': false }, function (err, padDetails) {
        if (err) {
            outputJson = { code: 301, status: "Failed", message: 'Server error while fetching pads details', };
            return res.json(outputJson);
        }
        else {
            if (!_.isNull(padDetails)) {
                outputJson = { code: 201, status: "Failed", message: 'pad name already exists' };
                return res.json(outputJson);
            }
            else {
                pad.save(function (err, pads) {
                    if (err) {
                        //console.log(err);
                        outputJson = { code: 201, status: "Failed", message: 'pad name is missing' };
                        return res.json(outputJson);
                    } else {
                        outputJson = { code: 200, status: "Success", message: 'Pad Details inserted successfully', data: pads };
                        return res.json(outputJson);
                    }
                });
            }
        }
    });
}

var fetchPadsData = function (req, res) {
    var padData = req.body;
    var offset = parseInt(padData.offset);
    var rows = parseInt(padData.rows);
    var condition = {};
    // console.log(padData, "padData")
    if (padData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (padData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: padData.companyId
        }
    }
    else if (padData.role == "2") {
        condition = {
            is_deleted: false,
            companyId: padData.companyId
        }
    }
    else if (padData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: padData.companyId
        }
    }
    Pads.find(condition)
        .skip(offset)
        .limit(rows)
        .exec(function (err, padsData) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
            else {
                //console.log('padsData=====>>>',padsData);
                Pads.count(condition).exec(function (err, count) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        //console.log(err);
                    }
                    if (padsData.length > 0) {
                        return res.json({ code: 200, status: "Success", count: count, data: padsData });
                    }
                    else {
                        return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
                    }
                });
            }
        })
    }


    var fetchPadsForGis = function(req, res){
        console.log('inside new api')
    Pads.find({ is_deleted: false}, function (err, padsData) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            //console.log('padsData<<<==',padsData);
            if (padsData) {
                return res.json({ code: 200, status: "Success", data: padsData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
    }
var fetchPads = function (req, res) {
console.log('req.data',req.query)
// var maxDistance = 100;
    // var sortObj = {};
    // if (req.body.distance == true) {
    //     sortObj = {
    //         distance: 1
    //     }
    // }
    // else if (req.body.name == true) {
    //     sortObj = {
    //         name: 1
    //     }
    // }
    // else if (req.body.open_time == true) {
    //     sortObj = {
    //         open_time: 1
    //     }
    // }
    var coords = [];
    coords[0] = parseFloat(req.query.longitude) || 0;
    coords[1] = parseFloat(req.query.latitude) || 0;
    // Pads.find({ is_deleted: false, companyId: userId }, function (err, padsData) {
    //     if (err) {
    //         return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
    //     }
    //     else {
    //         //console.log('padsData<<<==',padsData);
    //         if (padsData) {
    //             return res.json({ code: 200, status: "Success", data: padsData });
    //         }
    //         else {
    //             return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
    //         }
    //     }
    // })
    // Store.db.db.command({
    //     geoNear : "stores",
    //     near : { type : "Point", coordinates : [ -3.978, 50.777 ] },
    //     spherical : true,
    //     limit : 10
    // }, function(error, results){})
console.log('coords',coords);
setTimeout(function() {
    Pads.aggregate([
        {
            "$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": coords
                },
                "maxDistance": 50 * 1609,
                "distanceField": "distance",
                "spherical": true,
                "distanceMultiplier": 0.000621371
            }
        },
        {
            $match: {
                is_deleted: false
            }
        },
        // {
        //     // $limit : 2
        // },
    ]).exec(function (err, pads) {
        console.log('pads',pads);
        if (err) {
            return res.json({ code: 500, message: "Internal server error." });
        }
        res.json({ code: 200, data: pads, message: "Locations fetched successfully." });
    });
},100)
}

var totalPads = function (req, res) {
    var padData = req.body.data;
    var condition = {};
    //   var changeDateFormat=[];
    if (padData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (padData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: padData.companyId
        }
    }
    else if (padData.role == "2") {
        condition = {
            is_deleted: false,
            companyId: padData.companyId
        }
    }
    else if (padData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: padData.companyId
        }
    }
    Pads.find(condition).count().exec(function (err, padsData) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            if (padsData) {
                return res.json({ code: 200, status: "Success", data: padsData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
}

var fetchPadsWithComp = function (req, res) {
    var companyId = req.body.companyId;
    Pads.find({ companyId: companyId, is_deleted: false }, function (err, padsData) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            if (padsData) {
                return res.json({ code: 200, status: "Success", data: padsData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
}



var padData = function (comapny_id, callback) {
    var totalVolume = 0;
    Pads.find({ companyId: comapny_id, is_deleted: false }, function (err, padsData) {
        if (err) {
            console.log(err);
        } else {
            if (padsData) {
                padsData.forEach((item, index) => {
                    Tanks.find({ padId: item._id, is_deleted: false }, function (err, tanksData) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (tanksData) {
                                var count = 0;
                                tanksData.forEach((item, index) => {
                                    totalVolume += item.volume;
                                    count++;
                                });
                                if ((index + 1) == padsData.length) {
                                    callback(totalVolume);
                                }
                            } else {
                                console.log("TankData is not defined");
                            }
                        }
                    });
                });
            } else {
                console.log('pads data not found');
            }
        }
    });
}
var tankVolume = function (PadId, callback) {
    var totalVolume = 0;
    Tanks.find({ padId: PadId, is_deleted: false }, function (err, tanksData) {
        if (err) {
            console.log(err)
        } else {
            if (tanksData) {
                var count = 0;
                tanksData.forEach((item, index) => {
                    totalVolume += item.volume;
                    count++;
                });
                if (count == tanksData.length) {
                    callback(totalVolume);
                }
            } else {
                console.log("TankData is not defined");
            }
        }
    })
}

var fetchPadsWithTankVolume = function (req, res) {
    var PadId = req.body.padId;
    var comapny_id = req.body.companyId;
    if (PadId && comapny_id) {
        var company_volume = padData(comapny_id, function (val) {

            var pad_volume = tankVolume(PadId, function (padData) {
                return res.json({ code: 200, status: "Success", company_volume: val, pad_volume: padData });
            });
        });
    } else {
        return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
    }
}


var importPadsCsv = function (req, res) {
    console.log('in import padsCsv');
    var padArr = new Array();
    fs.createReadStream(req.files[0].destination + req.files[0].filename)
        .pipe(csv({
            // headers: ['tank_name', 'tank_no', 'lat', 'long', 'volume', 'type', 'companyId', 'padId'] // Specifing the headers
        }))
        .on('data', function (data) {
            addPadsByCsv(req, res);
            padArr.push({
                pad_name: data.pad_name,
                company_name: data.company_name,
                lat: data.lat,
                long: data.long
            });
        })
        .on('end', function (data) {
            req.body = {};
            savePads(padArr, req, res)
        })
}
function savePads(padArr, req, res) {
    for (var i = 0; i < padArr.length; i++) {
        req.body = padArr[i];
        addPadsByCsv(req, res);
        req.body = {};
        if (i == padArr.length - 1) {
            res.json({ code: 200, message: "Csv uploaded successfully" });
        }
    }
}
var addPadsByCsv = function (req, res) {
    var padsData = req.body;
    var outputJson = new Object();
    if (req.body.pad_name) {
        User.findOne({ company_name: req.body.company_name }, function (err, companyDetails) {
            if (err) {
                console.log(err);
            }
            else {
                if (!_.isNull(companyDetails)) {
                    padsData['companyId'] = companyDetails._id;
                    Pads.findOne({ pad_name: req.body.pad_name, 'is_deleted': false }, function (err, padsDetails) {
                        if (err) {
                            outputJson = { code: 301, status: "Failed", message: 'Server error while fetching tank details' };
                        }
                        else {
                            if (!_.isNull(padsDetails)) {
                                outputJson = { code: 201, status: "Failed", message: 'Pad name already exists' };
                            }
                            else {
                                var pad = new Pads(padsData);
                                pad.save(function (err, pad) {
                                    if (err) {
                                        return console.log(err);
                                        // outputJson = { code: 201, status: "Failed", message: 'pad data is missing' };
                                    } else {
                                        outputJson = { code: 200, status: "Success", message: 'CSV uploaded successfully', data: pad };
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
var exportPadsCsv = function (req, res) {
    var email = req.body.email;
    var outputJson;
    var PadData = req.body;
    var condition;
    if (PadData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (PadData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    else if (PadData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: tankData.companyId
        }
    }
    var fields = ['pad_name', 'lat', 'long', 'volume', 'company_name'];
    Pads.find(condition, function (err, padsData) {
        if (err) {
            outputJson = { code: 301, status: "Failed", message: 'Server error while fetching tank details', };
            return res.json(outputJson);
        }
        else {
            try {
                var result = json2csv({ data: padsData, fields: fields });
                fs.writeFile('pads.csv', result, function (err) {
                    if (err) {
                        outputJson = { code: 301, status: "Failed", message: 'Server error while fetching tank details', };
                        return res.json(outputJson);
                    }
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,// use SSL
                        debug: true,
                        auth: {
                            user: 'admin@productiondirector.cloud',
                            pass: 'Waterdisposal123!'
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
                        if (error) {
                            outputJson = { code: 301, status: "Failed", message: 'Server error while sending email or may be your email is incorrect', };
                            return res.json(outputJson);
                        } else {
                            outputJson = { code: 200, status: "Success", message: 'Tanks Csv is successfully sent to the email' };
                            return res.json(outputJson);
                        }
                    });
                });
            } catch (err) {
                outputJson = { code: 301, status: "Failed", message: 'Server error while fetching tank details', };
                return res.json(outputJson);
            }
        }
    })
}

var deletePads = function (req, res) {
    let padId = req.body.padId;
    Pads.update({ _id: padId }, { $set: { is_deleted: true } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while deleting pad" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}

//edit Pads
var editPads = function (req, res) {
    var padData = req.body ? req.body : {};
    Pads.findOne({ '_id': padData.padId, 'is_deleted': false }, function (err, padDetails) {
        if (padDetails) {
            return res.json({ code: 200, status: "Success", data: padDetails });
        }
        else {
            return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
        }
    });
}
var updatePads = function (req, res) {
    let padData = req.body;
    console.log('padData==', padData);
    // Tanks.update({ _id: userData._id,is_deleted: false }, { $set: { is_deleted: true } }, function (err, result) {
    Pads.findOneAndUpdate({ _id: padData._id, is_deleted: false }, { $set: { pad_name: padData.pad_name, lat: padData.lat, long: padData.long } }, { new: true }, function (err, result) {

        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            return res.json({ code: 200, status: "Success", message: "tank updated succesfully" });
        }
    })
}



var disablePad = function (req, res) {
    let userId = req.body.userId;
    Pads.update({ _id: userId }, { $set: { pad_status: 0 } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}

var enablePad = function (req, res) {
    let padId = req.body.padId;
    Pads.update({ _id: padId }, { $set: { pad_status: true } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching Pad details" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}

var fetchPadsLatLong = function (req, res) {
    var PadId = req.body.PadId;
    Pads.find({ _id: PadId, is_deleted: false }, function (err, padsData) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            if (padsData) {
                return res.json({ code: 200, status: "Success", data: padsData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
}
exports.fetchPadsLatLong = fetchPadsLatLong;
exports.enablePad = enablePad;
exports.disablePad = disablePad;
exports.updatePads = updatePads;
exports.editPads = editPads;
exports.deletePads = deletePads;
exports.fetchPadsWithTankVolume = fetchPadsWithTankVolume;
exports.exportPadsCsv = exportPadsCsv;
exports.addPadsByCsv = addPadsByCsv;
exports.addPad = addPad;
exports.fetchPads = fetchPads;
exports.fetchPadsData = fetchPadsData;
exports.fetchPadsWithComp = fetchPadsWithComp;
exports.importPadsCsv = importPadsCsv; totalPads
exports.totalPads = totalPads;
exports.fetchPadsForGis = fetchPadsForGis;

