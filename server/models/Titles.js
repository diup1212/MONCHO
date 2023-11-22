const mongoose = require("mongoose")

const Schema = mongoose.Schema

const TitlesSchema = new Schema ({
    Name: {
        type: String,
        required: true
    },
    Volumes: {
        type: [String],
        required: true
    },
    Genre: {
        type: [String],
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Publish_Date: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    Cover: {
        type: String,
        required: true
    },
    Tags: {
        type: [String],
        required: true
    },
    Ongoing: {
        type: Boolean,
        required: true
    },
    Publisher_Name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Titles', TitlesSchema)