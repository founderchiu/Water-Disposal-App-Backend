'use strict'

module.exports = function (route) {
    var superAdminCtrl = require('../../controllers/super-admin/super-admin.controller');
    var wellsCtrl = require('../../controllers/wells/wells.controller');
    // var auth = require('../../auth/auth');
     route.post('/wells', wellsCtrl.wellsDetails);
     route.post('/generateqrcode', wellsCtrl.generateQRcode);  
     route.post('/verifyqrcode', wellsCtrl.verifyQRcode); 
     route.post('/fetch-wells', wellsCtrl.fetchWells); 
     route.post('/delete-wells', wellsCtrl.deleteWells);
     route.post('/edit-wells', wellsCtrl.editWells);
     route.post('/update-wells', wellsCtrl.updateWells);
     route.post('/enable-wells', wellsCtrl.enableWell);
     route.post('/disable-wells', wellsCtrl.disableWell);
     route.post('/fetch-wells-with-pads',wellsCtrl.fetchWellsWithPad);
     route.post('/total-wells', wellsCtrl.totalWells);
    
     
}