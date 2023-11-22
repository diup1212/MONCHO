const mongoose = require("mongoose")

const Schema = mongoose.Schema

const VolumesSchema = new Schema ({
    Issues: {
        type: [String],
        required: true
    },
    Volume_Number: {
        type: Number,
        required: true
    },
    Title_Name: {
        type: String,
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
    First_Issue: {
        type: String,
        required: true
    },
    Last_Issue: {
        type: String,
        required: true
    },
    Publisher: {
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
    }
})

module.exports = mongoose.model('Volumes', VolumesSchema)