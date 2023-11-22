const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorsSchema = new Schema ({
    Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    Bio: {
        type: String,
        required: true
    },
    Role: {
        type: [String],
        required: true
    },
    Popular_Issues: {
        type: [String],
        required: true
    },
    Nationality: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Social_Media: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('Authors', AuthorsSchema)