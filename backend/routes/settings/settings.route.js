'use strict'

module.exports = function (route) {
    var superAdminCtrl = require('../../controllers/super-admin/super-admin.controller');
    var padsCtrl = require('../../controllers/settings/settings.controller');

     route.get('/settings', padsCtrl.getSettings);
}