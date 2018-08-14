'use strict'
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var FCM = require('fcm-push');
var _ = require('lodash');

var serverKey = 'AAAAa4o7Ncg:APA91bFgrWTBnByUeJ9Hk7rU7JJaOn7gMxA-tYgslq1GcVLhGl3TkZHUzk75XgCdx3GN-vXPeOOiMjAbzWLbaxeOsqc-rypDXtAvrJ3ezPaCw6WDV5vcAxlwjU5oSkEKxMGbtHG21ft5';
var fcm = new FCM(serverKey);

var sendPushNotification = function (req, res) {
    var userData = req.body ? req.body : '';
    console.log(userData, "swqsww")
    if (!_.isEmpty(userData)) {
        var message = {
            to: userData.deviceId,
            data: {
                your_custom_data_key: 'your_custom_data_value'
            },
            notification: {
                title: 'Title of your push notification',
                body: 'Body of your push notification'
            }
        };
        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!", err);
                return res.json({ code: 301, message: "Something has gone wrong!" + err });
            } else {
                console.log("Successfully sent with response: ", response);
                return res.json({ code: 200, message: "Successfully sent with response", data: response });
            }
        });
    }
    else {
        return res.json({ code: 301, message: "Body parameters are missing" })
    }
}

exports.sendPushNotification = sendPushNotification;