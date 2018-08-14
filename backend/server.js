var express = require('express');
const http = require('http');
router = express.Router();
var port = process.env.PORT || 3034;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

var cors = require('cors');
var timeStore = require('./models/timespend/storetime.model');
var Geofence = require('./models/geofence/geofence.model');
var User = require('./models/user/user.model');
var Pads = require('./models/pads/pads.model');
var Pads = require('./models/wells/wells.model');
var Tank = require('./models/tanks/tanks.model');
var Settings = require('./models/settings/settings.model');
var transactionDetails = require('./models/TransactionDetails/transactionDetails.model');
// var SuperAdmin = require('./models/super_admin/super_admin.model');
// var CompanyUser = require('./models/company_user/company_user.model');
// var WaterHaulerUser = require('./models/water_hauler_user/water_hauler_user.model');

var dbConfig = require('./config/db');

var QRCode = require('qrcode');
var async = require('async');


// QRCode.toDataURL('I am a pony!', function (err, url) {
//   console.log('data====',url);
// })


var app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// var social = require('./passport/passport')(app, passport);

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// create a write stream (in append mode)
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
// setup the logger
//app.use(morgan('combined', {stream: accessLogStream}));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, function (err) {
    if (err) {
        console.log('faild to connect with mongo DB', err);
    }
    else {
        console.log('Connection open with mongo db');
    }
})

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


//app.get('/', function (req, res) {
//    res.cookie('token', 'this is cookies test').send('Welcome to server api');
//});


app.use('/api', router);
var superAdminRoute = require('./routes/super-admin/super-admin.route')(router);
var padsRoute = require('./routes/pads/pads.route')(router);
var wellstanks = require('./routes/wells/wells.route')(router);
var tanksRoute = require('./routes/tanks/tanks.route')(router);
var settingsRoute = require('./routes/settings/settings.route')(router);
var transactionRoute = require('./routes/TransactionDetails/transactionDetails.route')(router);
var pushNotificationRoute = require('./routes/pushNotification/push_notification.route')(router);


//var tanksRoute = require('./routes//pads.route')(router);

//to define the static file folder like image,css,html etc

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../frontend/dist/')));
app.get('/', function (req, res) {

    return res.sendFile(path.resolve(path.join(__dirname, '../frontend/dist/index.html')));
});
app.use('/*', function (req, res) {
    return res.sendFile(path.resolve(path.join(__dirname, '../frontend/dist/index.html')));
});


/**
 * Create HTTP server.
 */
const server = http.createServer(app);
// var io = require('./controllers/socket/socket.js').listen(server);
server.timeout = 240000000;


server.listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Server api runing on port ', port);
    }
})
