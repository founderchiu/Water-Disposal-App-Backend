var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var WellsSchema = new Schema({
    well_name: {
        type: String,
        required: 'well name is required'
    },
    well_no: {
        type:Number,
        required: 'well_no  is required'
    },
    company_name: {
        type:String,
    },
    pad_name: {
        type:String,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    padId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'pads'
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
    well_status: {
        type: Boolean,
    },
    qrcode_url:{
        type:String

    },
    tank:{type:Number},
    note:{type:String}
    

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


WellsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('wells', WellsSchema);