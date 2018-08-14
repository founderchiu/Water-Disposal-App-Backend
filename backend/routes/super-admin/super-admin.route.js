'use strict'

module.exports = function (route) {
    var superAdminCtrl = require('../../controllers/super-admin/super-admin.controller');
    // var auth = require('../../auth/auth');

    route.post('/signup', superAdminCtrl.signup);
    route.post('/login', superAdminCtrl.login);
    route.post('/reset-password', superAdminCtrl.resetPassword);
    route.post('/forgotPassword', superAdminCtrl.forgotPassword);
    route.post('/enable-user', superAdminCtrl.enableUser);
    route.post('/logout', superAdminCtrl.logout);
    route.post('/editProfile', superAdminCtrl.editProfile);
    route.post('/changePassword', superAdminCtrl.changePassword)
    route.post('/update-profile', superAdminCtrl.updateProfile);
    // route.post('/create-water-hular-user', superAdminCtrl.createWaterHuler);
    route.post('/fetch-company', superAdminCtrl.fetchCompanies);
    route.post('/fetch-hauler', superAdminCtrl.fetchHaulers);
    route.post('/disable-user', superAdminCtrl.disableUser);
    route.post('/enable-user', superAdminCtrl.enableUser);
    route.post('/delete-user',superAdminCtrl.deleteUser);
    route.post('/fetch-company-users', superAdminCtrl.fetchCompanyUsers);
    route.post('/fetch-hauler-users', superAdminCtrl.fetchHaulersUser);
    route.post('/updatetlatlong', superAdminCtrl.updateLongLat);
    route.post('/upload-image',superAdminCtrl.uploadImage);
    route.post('/change-push-status',superAdminCtrl.pushEnableDisable);
    route.post('/geofence',superAdminCtrl.fetchgeofencing);
    route.post('/addgeofencing',superAdminCtrl.addgeofencing);
    route.post('/updateRadius',superAdminCtrl.updateRadius);
    route.post('/storedtime',superAdminCtrl.storedtime);
    route.post('/fetchlog',superAdminCtrl.fetchLog);
};
