var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    full_name: {
        type: String,
        required: 'fullname name is required'
    },
    email: {
        type: String,
        required: 'email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    role: {
        type: String,
        enum: ['0', '1', '2', '3', '4'], //0: SuperAdmin, 1: Company Admin, 2: Company staff, 3: Water hauler Admin, 4: Water hauler staff
        default: '4'
    },
    phone_no: {
        type: String,
        required: 'Phone no is required',
    },
    profile_img: {
        type: String,
    },
    company_name: {
        type: String,
    },
    company_desc: {
        type: String,
    },
    company_logo: {
        type: String,
        default: "/images/no-img.png"
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    deviceId: {
        type: String,
    },
    email_status: {
        type: Boolean,
        default: false
    },
    email_verification_token: {
        type: String
    },
    salt: {
        type: String
    },
    forgot_password_token: {
        type: String
    },
    status: {
        type: Number,
        enum: [0, 1], //0 ban ,1 active
        default: 0
    },
    push_noti_flag: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    currentlyActive: { type: Boolean, default: false },
    last_login: {
        type: Date
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    radius: {
        type: Number
    },
    loc: {
        type: [Number],   // format will be [ <longitude> , <latitude> ]
        index: '2dsphere'       // create the geospatial index
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

UserSchema.pre('save', function (next) {
    var user = this;
    // generate a random salt for every user for security
    user.salt = crypto.randomBytes(16).toString('hex');
    user.email_verification_token = crypto.randomBytes(25).toString('hex');
    user.password = crypto.pbkdf2Sync(user.password, this.salt, 1000, 64, 'sha1').toString('hex');
    next();
})


UserSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getHours() + 24); // session will expire after 24 hours

    return jwt.sign({
        _id: this._id,
        email: this.email,
        //exp: parseInt(expiry.getTime() / 1000),
        //exp: Math.floor(Date.now() / 1000) + (60 * 60),
        scu: this.role == 'user' ? 111 : 777  // user role auth 111 normal user, 777 admin
    }, secret.secret, { expiresIn: '4320h' }); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

UserSchema.methods.verifyToken = function (token, cb) {
    jwt.verify(token, secret.secret, function (err, dcode) {
        if (err) {
            cb(false);
        }
        else {
            cb(dcode);
        }
    })
}

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', UserSchema);