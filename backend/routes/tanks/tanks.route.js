'use strict';
var multer = require("multer");

module.exports = function (route) {
    var superAdminCtrl = require('../../controllers/super-admin/super-admin.controller');
    var tanksCtrl = require('../../controllers/tanks/tanks.controller');
    // var auth = require('../../auth/auth');

    route.post('/addtank', tanksCtrl.addTanks);
    route.post('/verifyTankQRcode', tanksCtrl.verifyTankQRcode);
    route.post('/fetch-tanks', tanksCtrl.fetchTanks);
    route.post('/import-tanks-csv', multer({ dest: "./uploads/" }).array("uploads[]", 12), tanksCtrl.importTanksCsv);
    route.post('/export-tanks-csv', tanksCtrl.exportTankCsv);
    // route.post('/fetch-tanks-chart', tanksCtrl.fetchDaysForChart);
    // route.post('/fetch-month-chart', tanksCtrl.fetchMonthChart);
    // route.post('/fetch-year-chart', tanksCtrl.yearChart);
    route.post('/fetch-total-volume', tanksCtrl.totalVolume);
    route.post('/tank-volume', tanksCtrl.singleTankVolume);
    // route.post('/single-tankvolume-line', tanksCtrl.singleTankVolumeForLine);
    // route.post('/single-tankvolume-line-month', tanksCtrl.singleTankVolumeForLineMonth);
    // route.post('/single-tankvolume-line-year', tanksCtrl.singleTankVolumeForLineYear);
    route.post('/edit-tanks', tanksCtrl.editTanks);
    route.post('/delete-tanks', tanksCtrl.deleteTank);
    route.post('/update-tanks', tanksCtrl.updateTank);
    route.post('/enable-tanks', tanksCtrl.enableTank);
    route.post('/disable-tanks', tanksCtrl.disableTank);
    route.post('/fetch-Images', tanksCtrl.fetchImages);
    route.post('/view-Image', tanksCtrl.viewImage);
    route.post('/fetch-TrancId', tanksCtrl.fetchTrancId)

   route.post('/total-tanks', tanksCtrl.totalTanks)
    
    
    
}