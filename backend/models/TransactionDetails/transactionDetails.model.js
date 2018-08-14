var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var transactionDetails = new Schema({
    tank_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'tank_id name is required',
        ref: 'tank'
    },
    hauler_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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
    invoice_no: {
        type: String
    },
    padId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'pads'
    },
    serial_no: {
        type: String
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


transactionDetails.plugin(mongoosePaginate);

module.exports = mongoose.model('transactionDetail', transactionDetails);