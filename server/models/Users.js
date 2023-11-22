const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema ({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,        
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    Profile_Image: {
        type: String
    },

    Favorite_Comics: {
        type: [String]
    },
    Suscription: {
        type: Boolean
    },
    Date_of_Birth: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', UsersSchema);