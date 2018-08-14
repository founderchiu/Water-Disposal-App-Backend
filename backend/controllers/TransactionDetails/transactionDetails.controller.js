'use strict'
var mongoose = require('mongoose');
var constant = require('../../config/constants');
var TransactionDetail = mongoose.model('transactionDetail');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;
var crypto = require('crypto');
var _ = require('lodash');
var QRCode = require('qrcode');
var Tanks = mongoose.model('tank');
var moment = require('moment');
var async = require('async');
var generator = require('generate-serial-number');
var storeTime = mongoose.model('storetime');
moment().format();


var saveTransactionDetails = function (req, res) {
    var serialNumber = generator.generate(10);
    req.body.serial_no = serialNumber;
    var date = new Date();
    var transactionDetail = new TransactionDetail(req.body);
    var userData = req.body ? req.body : {};
    var outputJson = new Object();
    Tanks.findOne({ '_id': userData.tank_id, 'is_deleted': false }, function (err, getTankDetails) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Invalid Parameters" });
        }
        else {
            if (getTankDetails) {
                transactionDetail.save(function (err, transaction) {
                    if (err) {
                        outputJson = { code: 201, status: "Failed" };
                        return res.json(outputJson);
                    } else {
                        outputJson = { code: 200, status: "Success", message: 'transaction details updated successfully', data: transaction };
                        return res.json(outputJson);
                    }
                });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server Error while adding details" });
            }
        }
    });
}
var exitTime = function (req, res) {
    var userId = ObjectId(req.body.userId);
    var d = new Date,
    dformat = [(d.getMonth()+1),
               d.getDate(),
               d.getFullYear()].join('/') +' ' +
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
    console.log(typeof(dformat));
            storeTime.update({userId: userId}, { $set: { exit_time:dformat} }, function (err, result) {
              
                if (err) {
                     return res.json({ code: 301, status: "Error", message: "Server error while fetching radius details" });
                }
                else {
                     return res.json({ code: 200, status: "Success", message: " updated succesfully" });
                }
        
    });
}
var fetchTransaction = function (req, res) {
    var tankId = req.body.tankId;
    console.log('transaction', tankId);
    TransactionDetail.find({ is_deleted: false, tank_id: tankId })
        .populate('tank_id', '_id serial_no tank_name')
        .populate('hauler_id', '_id full_name company_name').
        populate('padId', '_id pad_name').
        exec(function (err, transactionData) {
            // console.log('transactionData', transactionData);
            if (err) {
                console.log('err', err);
                return res.json({ code: 301, status: "Error", message: "Server error while fetching TransactionDetail details" });
            }
            else {
                if (transactionData) {

                    return res.json({ code: 200, status: "Success", data: transactionData });
                }
                else {
                    return res.json({ code: 301, status: "Error", message: "Server error while fetching TransactionDetail details" });
                }
            }
        })
}

var viewTransactions = function (req, res) {
    //console.log('hii');
    var transactionData = req.body;
    var offset = parseInt(transactionData.offset);
    var rows = parseInt(transactionData.rows);

    var condition = {};
    if (transactionData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (transactionData.role == "1") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.hauler_id)
        }
    }
    else if (transactionData.role == "2") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.hauler_id)
        }
    }
    else if (transactionData.role == "3") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.hauler_id)
        }
    }
    TransactionDetail.find(condition)
        .skip(offset)
        .limit(rows)
        .populate('tank_id', '_id serial_no tank_name')
        .populate('hauler_id', '_id full_name company_name').
        populate('padId', '_id pad_name').exec(function (err, transactionData) {
            if (err) {
                // console.log('err', err);
                return res.json({ code: 301, status: "Error", message: "Server error while fetching TransactionDetail details" });
            }
            else {
                //console.log('transactionData.length', transactionData.length);
                if (transactionData.length > 0) {
                    //  console.log('transactionData', transactionData.length);
                    TransactionDetail.count(condition).exec(function (err, count) {
                        if (err) {
                            return res.json({ code: 301, status: "Error", message: "Server error while fetching TransactionDetail details" });
                        }
                        else {
                            //  console.log('transactionData',transactionData);
                            return res.json({ code: 200, status: "Success", count: count, data: transactionData });
                        }
                    });
                } else {
                    return res.json({ code: 301, status: "Error", message: "Server error while fetching TransactionDetail details" });
                }
            }
        });
}

// var function selectTime(){
// }
var fetchUserTransaction = function (req, res) {

    function getLastWeek() {
        var today = new Date();
        var today = new Date();
        var lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return lastWeek;
    }

    var lastWeek = getLastWeek();
    var userId = new ObjectId(req.body.hauler_id);
    var timeGap = req.body.time;
    var date = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    if (timeGap == 'monthly') {
        TransactionDetail.aggregate([
            {
                $project: {
                    month: { $month: "$created_at" },
                    volume: 1,
                    tank_id: 1,
                    hauler_id: 1,
                    created_at: 1
                }
            },
            {
                $match: { hauler_id: userId, month: date }
            },
            {
                $sort: { created_at: -1 }
            }
        ], function (err, data) {
            // console.log('data==',data);
            if (err) {
                res.json({ code: 201, message: 'Failed to fetch transactions history', err: err });
            } else {
                TransactionDetail.populate(data, { path: 'tank_id', select: 'tank_name tank_no', populate: { path: 'padId', select: 'pad_name _id company_name companyId' } }, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({ code: 200, message: 'User Transaction history fetched successfully.', data: data });
                    }

                })

            }
        });
    }
    if (timeGap == 'yearly') {
        TransactionDetail.aggregate([
            {
                $project: {
                    year: { $year: "$created_at" },
                    volume: 1,
                    tank_id: 1,
                    hauler_id: 1,
                    created_at: 1
                }
            },
            {
                $match: { hauler_id: userId, year: year }
            },
            {
                $sort: { created_at: -1 }
            }
        ], function (err, data) {
            //console.log('data==', data);
            if (err) {
                // console.log(err);
                res.json({ code: 201, message: 'Failed to fetch transactions history', err: err });
            } else {
                //console.log('inside else 1');
                TransactionDetail.populate(data, { path: 'tank_id', select: 'tank_name tank_no', populate: { path: 'padId', select: 'pad_name _id company_name companyId' } }, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({ code: 200, message: 'User Transaction history fetched successfully.', data: data });
                    }

                })

            }
        });
    }
    // if (timeGap == 'today') {
    if (timeGap == 'today') {
        console.log('in today')
        TransactionDetail.aggregate([
            {
                $project: {
                    day: { $dayOfMonth: "$created_at" },
                    volume: 1,
                    tank_id: 1,
                    hauler_id: 1,
                    created_at: 1
                }
            },
            {
                $match: { hauler_id: userId, day: today }
            },
            {
                $sort: { created_at: -1 }
            }
        ], function (err, data) {
            // console.log('data==', data);
            if (err) {
                // console.log(err);
                res.json({ code: 201, message: 'Failed to fetch transactions history', err: err });
            } else {
                // console.log('inside else 1');
                TransactionDetail.populate(data, { path: 'tank_id', select: 'tank_name tank_no', populate: { path: 'padId', select: 'pad_name _id company_name companyId' } }, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({ code: 200, message: 'User Transaction history fetched successfully.', data: data });
                    }

                })

            }
        });
    }
    if (timeGap == 'weekly') {
        var startDate = new Date(moment().subtract(7, "days").format("YYYY-MM-DD"));
        var endDate = moment().format("YYYY-MM-DD");
        var conditions = {
            "is_deleted": false,
            "created_at": { $gte: new Date(startDate), $lt: new Date(endDate) },
            "hauler_id": userId
        }
        TransactionDetail.find(conditions).exec(function (err, data) {
            //console.log('data==', data);
            if (err) {
                // console.log(err);
                res.json({ code: 201, message: 'Failed to fetch transactions history', err: err });
            } else {
                // console.log('inside else 1');
                TransactionDetail.populate(data, { path: 'tank_id', select: 'tank_name tank_no', populate: { path: 'padId', select: 'pad_name _id company_name companyId' } }, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({ code: 200, message: 'User Transaction history fetched successfully.', data: data });
                    }

                })

            }
        });
    }
}
// Code for pie chart
var fetchVolume = function (req, res) {
    var year = new Date().getFullYear();
    var transactionData = req.body;
    var condition = {};
    // console.log('transactionData in pie chart', transactionData);
    if (transactionData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (transactionData.role == "1") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.companyId)
        }
    }
    else if (transactionData.role == "2") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.companyId)
        }
    }
    else if (transactionData.role == "3") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.companyId)
        }
    }

    TransactionDetail.aggregate(
        [
            {
                $project: {
                    volume: 1,
                    created_at: 1,
                    is_deleted: 1,
                    hauler_id: 1,
                    padId: 1,
                    tank_id: 1
                }
            },
            { $match: condition },
            {
                $group: {
                    _id: "$padId",
                    //padId:{$padId:"$padId"},
                    volume: { $sum: "$volume" },
                    created_at: { $first: "$created_at" }
                }
            },
            {
                $lookup: {
                    from: "pads", localField: "_id", foreignField: "_id", as: "padsData"
                }
            },
            { $unwind: { "path": "$padsData", "preserveNullAndEmptyArrays": true } }
        ]).exec(function (err, data) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching TransactionDetail details" });
            }
            else {
                // console.log('data==', data);
                if (data) {
                    return res.json({ code: 200, status: "Success", data: data });
                }
                else {
                    return res.json({ code: 301, status: "Error", message: "Server error while fetching TransactionDetail details" });
                }
            }
        })
}
var fetchDaysForPieChart = function (req, res) {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    console.log('today', today);
    var transactionData = req.body;
    //console.log('transactionData',transactionData);

    var condition = {};
    if (transactionData.role == "0") {
        condition = {
            is_deleted: false,
            today: today,
            month: month,
            year: year
        }
    }
    else if (transactionData.role == "1") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.hauler_id),
            today: today,
            month: month,
            year: year
        }
    }
    else if (transactionData.role == "2") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.hauler_id),
            today: today,
            month: month,
            year: year
        }
    }
    else if (transactionData.role == "3") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.hauler_id),
            today: today,
            month: month,
            year: year
        }
    }
    // console.log('condition',condition);
    TransactionDetail.aggregate([
        {
            $project: {
                year: { $year: "$created_at" },
                month: { $month: "$created_at" },
                today: { $dayOfMonth: "$created_at" },
                volume: 1,
                created_at: 1,
                is_deleted: 1,
                hauler_id: 1,
                padId: 1,
                tank_id: 1
            }
        },

        { $match: condition },
        {
            $group: {
                _id: "$padId",
                volume: { $sum: "$volume" },
                created_at: { $first: "$created_at" },
                is_deleted: { $first: "$is_deleted" }

            }
        },
        {
            $lookup: {
                from: "pads", localField: "_id", foreignField: "_id", as: "padsData"
            }
        },
        { $unwind: { "path": "$padsData", "preserveNullAndEmptyArrays": true } }
    ]).exec(function (err, tanksData) {
        // console.log('tankData pie Day data==', tanksData);
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
var fetchMonthPieChart = function (req, res) {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    var tankData = req.body;
    var condition = {};
    //var hours = new
    if (tankData.role == "0") {
        condition = {
            is_deleted: false,
            month: month,
            year: year
        }
    }
    else if (tankData.role == "1") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(tankData.hauler_id),
            month: month,
            year: year
        }
    }
    else if (tankData.role == "2") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(tankData.hauler_id),
            month: month,
            year: year
        }
    }
    else if (tankData.role == "3") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(tankData.hauler_id),
            month: month,
            year: year
        }
    }
    TransactionDetail.aggregate(
        [
            {
                $project: {
                    year: { $year: "$created_at" },
                    month: { $month: "$created_at" },
                    volume: 1,
                    created_at: 1,
                    is_deleted: 1,
                    hauler_id: 1,
                    padId: 1,
                    tank_id: 1
                }
            },
            { $match: condition },
            {
                $group: {
                    _id: "$padId",
                    volume: { $sum: "$volume" },
                    created_at: { $first: "$created_at" },
                    is_deleted: { $first: "$is_deleted" }
                }
            },
            {
                $lookup: {
                    from: "pads", localField: "_id", foreignField: "_id", as: "padsData"
                }
            },
            { $unwind: { "path": "$padsData", "preserveNullAndEmptyArrays": true } }
        ]

    ).exec(function (err, tanksData) {
        //console.log('tankData in Pie Month data==', tanksData);
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
        }
        else {
            // console.log('tanksData', tanksData);
            if (tanksData) {

                return res.json({ code: 200, status: "Success", data: tanksData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
}

var yearPieChart = function (req, res) {
    //console.log('in yearrrrrrrrrr');
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    var tankData = req.body;
    var condition = {};
    if (tankData.role == "0") {
        condition = {
            is_deleted: false,
            year: year
        }
    }
    else if (tankData.role == "1") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(tankData.hauler_id),
            year: year
        }
    }
    else if (tankData.role == "2") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(tankData.hauler_id),
            year: year
        }
    }
    else if (tankData.role == "3") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(tankData.hauler_id),
            year: year
        }
    }
    TransactionDetail.aggregate([
        {
            $project: {
                year: { $year: "$created_at" },
                volume: 1,
                created_at: 1,
                is_deleted: 1,
                hauler_id: 1,
                padId: 1,
                tank_id: 1
            }
        },
        { $match: condition },
        {
            $group: {
                _id: "$padId",
                volume: { $sum: "$volume" },
                created_at: { $first: "$created_at" },
                is_deleted: { $first: "$is_deleted" }
            }
        },
        {
            $lookup: {
                from: "pads", localField: "_id", foreignField: "_id", as: "padsData"
            }
        },
        { $unwind: { "path": "$padsData", "preserveNullAndEmptyArrays": true } }

    ]).exec(function (err, tanksData) {
        // console.log('tanksData in year===', tanksData)
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
        }
        else {
            if (tanksData) {
                //console.log(tanksData)
                return res.json({ code: 200, status: "Success", data: tanksData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
}

var fetchDaysForChart = function (req, res) {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    var transactionData = req.body;
    //console.log('transactionData',transactionData);

    var condition = {};
    if (transactionData.role == "0") {
        condition = {
            is_deleted: false,
            month: month,
            year: year
        }
    }
    else if (transactionData.role == "1") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.hauler_id),
            month: month,
            year: year
        }
    }
    else if (transactionData.role == "2") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.hauler_id),
            month: month,
            year: year
        }
    }
    else if (transactionData.role == "3") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(transactionData.hauler_id),
            month: month,
            year: year
        }
    }
    // console.log('condition',condition);
    TransactionDetail.aggregate([
        {
            $project: {
                year: { $year: "$created_at" },
                month: { $month: "$created_at" },
                volume: 1,
                created_at: 1,
                is_deleted: 1,
                hauler_id: 1
            }
        },

        { $match: condition },
        {
            $group: {
                _id: { $dayOfMonth: "$created_at" },
                volume: { $sum: "$volume" },
                created_at: { $first: "$created_at" },
                is_deleted: { $first: "$is_deleted" },
                month: { $first: "$month" }

            }
        }, { $sort: { _id: 1 } }
    ]).exec(function (err, tanksData) {
        // console.log('tankData in daysfor chart==', tanksData);
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
var fetchMonthChart = function (req, res) {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    var tankData = req.body;
    var condition = {};
    //var hours = new
    if (tankData.role == "0") {
        condition = {
            is_deleted: false,
            year: year
        }
    }
    else if (tankData.role == "1") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(tankData.hauler_id),
            year: year
        }
    }
    else if (tankData.role == "2") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(tankData.hauler_id),
            year: year
        }
    }
    else if (tankData.role == "3") {
        condition = {
            is_deleted: false,
            hauler_id: ObjectId(tankData.hauler_id),
            year: year
        }
    }
    TransactionDetail.aggregate(
        [
            {
                $project: {
                    year: { $year: "$created_at" },
                    month: { $month: "$created_at" },
                    volume: 1,
                    created_at: 1,
                    is_deleted: 1,
                    hauler_id: 1
                }
            },
            { $match: condition },
            {
                $group: {
                    _id: { $month: "$created_at" },
                    volume: { $sum: "$volume" }
                }
            }, { $sort: { _id: 1 } }

        ]

    ).exec(function (err, tanksData) {
        //console.log('tankData in Month==', tanksData);
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
        }
        else {
            // console.log('tanksData', tanksData);
            if (tanksData) {

                return res.json({ code: 200, status: "Success", data: tanksData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
}
var yearChart = function (req, res) {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    var tankData = req.body;
    var condition = {};
    if (tankData.role == "0") {
        condition = {
            is_deleted: false,
            //year: year
        }
    }
    else if (tankData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: ObjectId(tankData.companyId),
            //year: year
        }
    }
    else if (tankData.role == "2") {
        condition = {
            is_deleted: false,
            companyId: ObjectId(tankData.companyId),
            //year: year
        }
    }
    else if (tankData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: ObjectId(tankData.companyId),
            //year: year
        }
    }
    TransactionDetail.aggregate([
        {
            $project: {
                //year: { $year: "$created_at" },
                volume: 1,
                created_at: 1,
                is_deleted: 1,
                companyId: 1
            }
        },
        { $match: condition },
        {
            $group: {
                _id: { $year: "$created_at" },
                volume: { $sum: "$volume" }
            }
        }, { $sort: { _id: 1 } }

    ]).exec(function (err, tanksData) {
        //console.log('tanksData in year===', tanksData)
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
        }
        else {
            if (tanksData) {
                //console.log(tanksData)
                return res.json({ code: 200, status: "Success", data: tanksData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    })
}

var singleTankVolumeForLine = function (req, res) {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    var padData = req.body ? req.body : {};
    console.log('padData.padId', padData.tankId);
    var condition = {};
    if (padData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (padData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: ObjectId(padData.companyId)
        }
    }
    else if (padData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: ObjectId(padData.companyId)
        }
    }
    //  console.log('condition',condition);
    TransactionDetail.aggregate(
        [
            {
                $project: {
                    year: { $year: "$created_at" },
                    month: { $month: "$created_at" },
                    volume: 1,
                    created_at: 1,
                    is_deleted: 1,
                    padId: 1,
                    _id: 1,
                    tank_id: 1

                }
            },
            { $match: { "tank_id": ObjectId(padData.tankId), is_deleted: false, month: month, year: year } },
            {
                $group: {
                    //_id: "$tank_id",
                    _id: { $dayOfMonth: "$created_at" },
                    //tankData: { $push: "$$ROOT" },
                    // tank_id: { $first: "$tank_id" },
                    volume: { $sum: "$volume" },
                    //created_at: { $first: "$created_at" },
                }
            },
            { $sort: { _id: 1 } }
        ]

    ).
        exec(function (err, tanksData) {
            if (err) {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
            }
            else {
                if (tanksData) {
                    console.log('tankData in single line data==', tanksData);
                    return res.json({ code: 200, status: "Success", data: tanksData });
                }
                else {
                    return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
                }
            }
        })
}
var singleTankVolumeForLineMonth = function (req, res) {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    var padData = req.body ? req.body : {};

    var condition = {};
    if (padData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (padData.role == "1") {
        condition = {
            is_deleted: false,
            companyId: ObjectId(padData.companyId)
        }
    }
    else if (padData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: ObjectId(padData.companyId)
        }
    }
    TransactionDetail.aggregate(
        [
            {
                $project: {
                    year: { $year: "$created_at" },
                    volume: 1,
                    created_at: 1,
                    is_deleted: 1,
                    _id: 1,
                    tank_id: 1,
                    padId: 1
                }
            },
            { $match: { "tank_id": ObjectId(padData.padId), is_deleted: false, year: year } },// 
            {
                $group: {
                    _id: { $month: "$created_at" },
                    volume: { $sum: "$volume" }
                }
            }, { $sort: { _id: 1 } }

        ]
    ).exec(function (err, tanksData) {
        //console.log('tanksData in singleTankVolumeForLineMonth', tanksData);
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
var singleTankVolumeForLineYear = function (req, res) {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today = new Date().getDate();
    var padData = req.body ? req.body : {};

    var condition = {};
    console.log('padData.condition==', condition);
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
    else if (padData.role == "3") {
        condition = {
            is_deleted: false,
            companyId: padData.companyId
        }
    }
    TransactionDetail.aggregate(
        [
            {
                $project: {
                    volume: 1,
                    created_at: 1,
                    is_deleted: 1,
                    _id: 1,
                    tank_id: 1,
                    padId: 1
                }
            },
            { $match: { "tank_id": ObjectId(padData.tankId), is_deleted: false } },
            {
                $group: {
                    _id: { $year: "$created_at" },
                    volume: { $sum: "$volume" }
                }
            }, { $sort: { _id: 1 } }

        ]
    ).exec(function (err, tanksData) {
        //console.log('tanksData in LineYear', tanksData);
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



var totalTransaction = function (req, res) {
    var trcData = req.body.data;
    var condition = {};
    //   var changeDateFormat=[];
    if (trcData.role == "0") {
        condition = {
            is_deleted: false
        }
    }
    else if (trcData.role == "1") {
        condition = {
            is_deleted: false,
            hauler_id: trcData.hauler_id
        }
    }
    else if (trcData.role == "2") {
        condition = {
            is_deleted: false,
            hauler_id: trcData.hauler_id
        }
    }
    else if (trcData.role == "3") {
        condition = {
            is_deleted: false,
            hauler_id: trcData.hauler_id
        }
    }
    // console.log('condition==>>',condition);
    TransactionDetail.find(condition).count().exec(function (err, transactionDetails) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
        }
        else {
            // console.log('total  ====transactionDetail',transactionDetail)
            if (transactionDetails) {
                //   console.log('total  ====transactionDetail',transactionDetails)
                return res.json({ code: 200, status: "Success", data: transactionDetails });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching tank details" });
            }
        }
    })
}
exports.totalTransaction = totalTransaction;
exports.singleTankVolumeForLineYear = singleTankVolumeForLineYear;
exports.singleTankVolumeForLineMonth = singleTankVolumeForLineMonth;
exports.singleTankVolumeForLine = singleTankVolumeForLine;


exports.yearChart = yearChart;
exports.fetchMonthChart = fetchMonthChart;
exports.fetchDaysForChart = fetchDaysForChart;


exports.fetchVolume = fetchVolume;
exports.fetchUserTransaction = fetchUserTransaction;
exports.fetchTransaction = fetchTransaction;
exports.saveTransactionDetails = saveTransactionDetails;
exports.viewTransactions = viewTransactions;
exports.fetchDaysForPieChart = fetchDaysForPieChart;
exports.fetchMonthPieChart = fetchMonthPieChart;
exports.yearPieChart = yearPieChart;
exports.exitTime = exitTime;

