'use strict'
var mongoose = require('mongoose');
var constant = require('../../config/constants');
var Settings = mongoose.model('settings');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;
var crypto = require('crypto');
var _ = require('lodash');

var getSettings = function (req, res) {
    var outputJson = new Object();
    Settings.find({ is_deleted: false }, function (err, settingsData) {
        if (err) {
            return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
        }
        else {
            if (settingsData) {
               return res.json({ code: 200, status: "Success", data:settingsData });
            }
            else {
                return res.json({ code: 301, status: "Error", message: "Server error while fetching user details" });
            }
        }
    });
}
exports.getSettings = getSettings;

