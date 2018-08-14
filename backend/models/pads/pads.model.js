var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var PadsSchema = new Schema({
    company_name: {
        type: String,
        required: 'Comapany name is required'
    },
    pad_name: {
        type: String,
        required: 'pad name is required'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    pad_status: {
        type: Boolean,
        default: true
    },
    position: {
        type: [Number],   // format will be [ <longitude> , <latitude> ]
        index: '2dsphere'       // create the geospatial index
    },


}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


PadsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('pads', PadsSchema);