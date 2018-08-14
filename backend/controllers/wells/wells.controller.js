'use strict'
var mongoose = require('mongoose');
var constant = require('../../config/constants');
var Wells = mongoose.model('wells');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;
var crypto = require('crypto');
var _ = require('lodash');
var QRCode = require('qrcode')

//sonu code for Add wells details 
var wellsDetails = function (req, res) {
    var wells = new Wells(req.body);
    var outputJson = new Object();
    var wellsData = req.body ? req.body : {};
    Wells.findOne({ 'well_name': wellsData.well_name, 'is_deleted': false }, function (err, wellDetails) {
        if (err) {
            outputJson = { code: 301, status: "Failed", message: 'Server error while fetching wells details', };
            return res.json(outputJson);
        }
        else {
            console.log('wellDetails', wellDetails);
            if (!_.isNull(wellDetails)) {
                outputJson = { code: 201, status: "Failed", message: 'well name already exists' };
                return res.json(outputJson);
            }
            else {
                wells.save(function (err, wells) {
                    if (err) {
                        console.log(err);
                        outputJson = { code: 201, status: "Failed", message: 'well name is missing' };
                        return res.json(outputJson);
                    } else {
                        outputJson = { code: 200, status: "Success", message: 'well Details inserted successfully', data: wells };
                        return res.json(outputJson);
                    }
                });
            }
        }
    });
}

var generateQRcode = function (req, res) {
    var wells = new Wells(req.body);
    var outputJson = new Object();
    var wellsData = req.body ? req.body : {};

    Wells.findOne({ '_id': wellsData._id, 'is_deleted': false }, function (err, wellDetails) {
        if (err) {
            outputJson = { code: 301, status: "Failed", message: 'Server error while fetching wells details' };
            return res.json(outputJson);
        }
        else {
            var user_id = wellDetails._id.toString();
            QRCode.toDataURL(user_id, function (err, url) {
                //console.log('qr wellDetails._id===',wellDetails._id);
                Wells.findOneAndUpdate({ _id: wellDetails._id }, { $set: { qrcode_url: url } }, function (err, result) {
                    if (err) {
                        outputJson = { code: 201, status: "Failed", message: 'id is missing' };
                        return res.json(outputJson);
                    } else {
                        //console.log("result",result);
                        outputJson = { code: 200, status: "Success", message: 'QR code generated successfully', data: result };
                        return res.json(outputJson);
                    }
                });
            });
        }
    });
}

var verifyQRcode = function (req, res) {
    var wells = new Wells(req.body);
    var outputJson = new Object();
    var wellsData = req.body ? req.body : {};

    Wells.findOne({ '_id': wellsData._id, 'is_deleted': false }, function (err, wellDetails) {
        if (err) {
            outputJson = { code: 301, status: "Failed", message: 'Invalid QR code ' };
            return res.json(outputJson);
        }
        else {
            if (wellDetails) {
                //console.log("result",result);
                outputJson = { code: 200, status: "Success", message: 'QR code matched', data: wellDetails };
                return res.json(outputJson);
            }
        }
    });
}

var fetchWells = function (req, res) {
    var wellData = req.body;
    var offset = parseInt(wellData.offset);
    var rows = parseInt(wellData.rows);
    var condition = {};
    console.log(wellData, "wellData")
    if (wellData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (wellData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: wellData.companyId
        }
    }
    else if (wellData.role == "2") {
        condition = {
            is_deleted: false,
            companyId: wellData.companyId
        }
    }
    else if (wellData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: wellData.companyId
        }
    }

    Wells.find(condition)
        .skip(offset)
        .limit(rows).populate('companyId', '_id full_name company_name').
        populate('padId', '_id pad_name')
        .exec(function (err, wellsData) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching wells details" });
            }
            else {
                Wells.count(condition).exec(function (err, count) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        //console.log(err);
                    }
                    if (wellsData) {
                        console.log('wellsData',wellsData);
                        return res.json({ code: 200, status: "Success", count: count, data: wellsData });
                    }
                    else {
                        return res.json({ code: 301, status: "Error", message: "Server error while fetching wells details" });
                    }
                });
            }
        })
}
var deleteWells = function (req, res) {
    let userId = req.body.userId;
    Wells.update({ _id: userId }, { $set: { is_deleted: true } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}


//edit wells
var editWells = function (req, res) {
    var wellData = req.body ? req.body : {};
   // console.log('wellData==',wellData);
    Wells.findOne({ '_id': wellData.wellId, 'is_deleted': false }, function (err, wellDetails) {
        if (wellDetails) {
            return res.json({ code: 200, status: "Success", data: wellDetails });
        }
        else {
            return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
        }
    });
}
var updateWells = function (req, res) {
    let userData = req.body;
    console.log('userData==',userData);
   // Tanks.update({ _id: userData._id,is_deleted: false }, { $set: { is_deleted: true } }, function (err, result) {
        Wells.findOneAndUpdate({ _id: userData._id, is_deleted: false }, { $set: { well_name: userData.well_name,well_no: userData.well_no,companyId:userData.companyId,padId:userData.padId} }, { new: true }, function (err, result) {
            
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
           // console.log('result==',result);
            return res.json({ code: 200, status: "Success", message:"tank updated succesfully" });
        }
    })
}

var disableWell = function (req, res) {
    let userId = req.body.userId;
    Wells.update({ _id: userId }, { $set: { status: 0 } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}

var enableWell = function (req, res) {
    let userId = req.body.userId;
    Wells.update({ _id: userId }, { $set: { status: 1 } }, function (err, result) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            return res.json({ code: 200, status: "Success" });
        }
    })
}


var fetchWellsWithPad = function (req, res) {
    var padId = req.body.padId;
    Wells.find({ padId: padId, is_deleted: false }, function (err, WellData) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching well details" });
        }
        else {
            if (WellData) {
                return res.json({ code: 200, status: "Success", data: WellData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching well details" });
            }
        }
    })
}



var totalWells = function (req, res) {
    var padData=req.body.data;
    var condition={};
   // console.log('padData===',padData)
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
    Wells.find(condition).count().exec(function (err, wellsData) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
        }
        else {
            //console.log('wellsData==')
            if (wellsData) {
                return res.json({ code: 200, status: "Success", data: wellsData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
            }
        }
    })
}
exports.totalWells=totalWells;
exports.fetchWellsWithPad=fetchWellsWithPad;
exports.enableWell=enableWell;
exports.disableWell=disableWell;
exports.updateWells=updateWells;
exports.editWells=editWells;
exports.deleteWells = deleteWells;
exports.fetchWells = fetchWells;
exports.verifyQRcode = verifyQRcode;
exports.wellsDetails = wellsDetails;
exports.generateQRcode = generateQRcode;
