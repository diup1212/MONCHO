const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema ({
    comictitle: {
        type: String,
        requiered: true
    },

    comicdescription: {
        type: String,
        requiered: true
    }
});

module.exports = mongoose.model('Post', PostSchema);