const mongoose = require("mongoose")

const Schema = mongoose.Schema

const IssuesSchema = new Schema ({
    Volume_Number: {
        type: String,
        required: true
    },
    Issue_Number: {
        type: Number,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Issue_Name: {
        type: String,
        required: true
    },
    Publish_Date: {
        type: String,
        required: true
    },
    Authors: {
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
    Publisher: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    Cover: {
        type: String
    },
    Tags: {
        type: [String],
        required: true
    },
    Free: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Issues', IssuesSchema)