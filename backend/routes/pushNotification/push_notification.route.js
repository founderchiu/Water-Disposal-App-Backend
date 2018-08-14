'use strict'

module.exports = function (route) {
    var pushNotificationCtrl = require('../../controllers/pushNotification/push_notification.controller');
    // var auth = require('../../auth/auth');

     route.post('/send-push-notification', pushNotificationCtrl.sendPushNotification);
}