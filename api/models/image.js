const mongoose = require('mongoose')

let Item = mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('image',Item);