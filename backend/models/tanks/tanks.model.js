var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var TankSchema = new Schema({
    tank_name: {
        type: String,
        required: 'Comapany name is required'
    },
    tank_no: {
        type: String,
        required: 'tank name is required'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    padId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'pads'
    },
    wellId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'wells'
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    volume: {
        type: Number
    },
    type: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    tank_status: {
        type: Boolean,
        default: true
    },
    qrcode_url: {
        type: String

    },
    serial_no: {
        type: String
    },
    qrcode_url: {
        type: String

    },
    invoice_no: {
        type: String

    },



}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


TankSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('tank', TankSchema);