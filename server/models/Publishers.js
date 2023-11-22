const mongoose = require("mongoose")

const Schema = mongoose.Schema

const PublishersSchema = new Schema ({
    Name: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Titles: {
        type: [String],
        required: true
    },
    Website: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Publishers', PublishersSchema)