var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var storetimeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    is_deleted: {
        type: String
    },
    padId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pads'
    },
    entry_time: {
        type: String
    },
    exit_time: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


storetimeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('storetime', storetimeSchema);