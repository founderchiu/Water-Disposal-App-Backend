'use strict'

module.exports = function (route) {
    var superAdminCtrl = require('../../controllers/super-admin/super-admin.controller');
    var transactionCtrl = require('../../controllers/TransactionDetails/transactionDetails.controller');
    // var auth = require('../../auth/auth');

    route.post('/savetransactionDetails', transactionCtrl.saveTransactionDetails);
    route.post('/fetchtransactionDetails', transactionCtrl.fetchTransaction);
    route.post('/fetch-user-transactions', transactionCtrl.fetchUserTransaction);
    route.post('/fetch-Volume', transactionCtrl.fetchVolume);

    route.post('/fetch-tanks-chart', transactionCtrl.fetchDaysForChart);
    route.post('/fetch-month-chart', transactionCtrl.fetchMonthChart);
    route.post('/fetch-year-chart', transactionCtrl.yearChart);

    route.post('/single-tankvolume-line', transactionCtrl.singleTankVolumeForLine);
    route.post('/single-tankvolume-line-month', transactionCtrl.singleTankVolumeForLineMonth);
    route.post('/single-tankvolume-line-year', transactionCtrl.singleTankVolumeForLineYear);
    route.post('/view-transaction-Details', transactionCtrl.viewTransactions);


    route.post('/view-days-PieChart', transactionCtrl.fetchDaysForPieChart);
    route.post('/view-months-PieChart', transactionCtrl.fetchMonthPieChart);
    route.post('/view-years-PieChart', transactionCtrl.yearPieChart);
    route.post('/total-transaction', transactionCtrl.totalTransaction);
    route.post('/exitTime', transactionCtrl.exitTime);
}