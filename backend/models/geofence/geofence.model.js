var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var GeofenceSchema = new Schema({
    radius: {
        type: Number
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


GeofenceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('geofence', GeofenceSchema);