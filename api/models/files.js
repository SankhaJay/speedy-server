const mongoose = require('mongoose')


//schema files
let filesSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true
    } 
});

let files = module.exports = mongoose.model('files', filesSchema)