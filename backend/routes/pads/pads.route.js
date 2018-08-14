'use strict'
var multer = require("multer");
module.exports = function (route) {
    var superAdminCtrl = require('../../controllers/super-admin/super-admin.controller');
    var padsCtrl = require('../../controllers/pads/pads.controller');
    // var auth = require('../../auth/auth');

     route.post('/add-pads', padsCtrl.addPad);
     route.get('/fetch-pads', padsCtrl.fetchPads);
     route.post('/fetch-padsData', padsCtrl.fetchPadsData);
     route.post('/fetch-pads-with-comp',padsCtrl.fetchPadsWithComp);
     route.post('/import-pads-csv', multer({ dest: "./uploads/" }).array("uploads[]", 12), padsCtrl.importPadsCsv);
     route.post('/export-pads-csv',padsCtrl.exportPadsCsv);
     route.post('/fetch-pads-Volume',padsCtrl.fetchPadsWithTankVolume);
     route.post('/delete-pads',padsCtrl.deletePads);
     route.post('/edit-pads',padsCtrl.editPads);
     route.post('/update-pads',padsCtrl.updatePads);
     route.post('/enable-pads',padsCtrl.enablePad);
     route.post('/disable-pads',padsCtrl.disablePad);
     route.post('/fetch-Pads-LatLong',padsCtrl.fetchPadsLatLong);
     route.post('/total-pads',padsCtrl.totalPads);
     route.get('/fetch-Pads-For-Gis',padsCtrl.fetchPadsForGis);
}