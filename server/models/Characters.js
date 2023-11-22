const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CharactersSchema = new Schema ({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    First_Appearance: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Characters', CharactersSchema)