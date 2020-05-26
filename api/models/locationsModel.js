const mongoose = require('mongoose');

const locationsSchema = mongoose.Schema({
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
        required: true
    },

});

module.exports = mongoose.model("Test", locationsSchema);