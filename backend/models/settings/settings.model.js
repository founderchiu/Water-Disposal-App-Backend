var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var SettingSchema = new Schema({
    terms_and_condition: {
        type: String,
    },
    privacy_policy: {
        type: String,
    },
    is_deleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


SettingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('settings', SettingSchema);