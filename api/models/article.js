const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model("Article", articleSchema);
//const Article = module.exports = mongoose.model('Article',articleSchema);