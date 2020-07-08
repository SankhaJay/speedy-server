const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    speed: {
        type: String,
        required: true
    },
    location: {
        name: { type: String, required: true },
        longitude: { type: String, required: true },
        latitude: { type: String, required: true }
    },
    tested_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    isp: {
        type: String,
    },

});

module.exports = mongoose.model("Test", testSchema); 