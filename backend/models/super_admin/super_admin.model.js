var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var SuperAdminSchema = new Schema({
    username: {
        type: String,
        required: 'username is required'
    },
    email: {
        type: String,
        required: 'email is required',
        unique:true
    },
    password: {
        type: String,
        required: 'Password is required',
        select: false
    },
    role: {
        type: String,
        enum: ['su'],
        default: 'su'
    },
    company_name: {
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
        default: 1
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    push_noti_flag: {
        type: Boolean,
        default: true
    },
    loc: {
        type: [Number],   // format will be [ <longitude> , <latitude> ]
        index: '2dsphere'       // create the geospatial index
    },
    radius: {
        type: Number
    },
    currentlyActive: { type: Boolean, default: false },
    last_login: {
        type: Date
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

SuperAdminSchema.pre('save', function (next) {
    var user = this;
    // generate a random salt for every user for security
    user.salt = crypto.randomBytes(16).toString('hex');
    user.email_verification_token = crypto.randomBytes(25).toString('hex');
    user.password = crypto.pbkdf2Sync(user.password, this.salt, 1000, 64, 'sha1').toString('hex');
    next();
})


SuperAdminSchema.methods.generateJwt = function () {
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

SuperAdminSchema.methods.verifyToken = function (token, cb) {
    jwt.verify(token, secret.secret, function (err, dcode) {
        if (err) {
            cb(false);
        }
        else {
            cb(dcode);
        }
    })
}

SuperAdminSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('super_admin', SuperAdminSchema);