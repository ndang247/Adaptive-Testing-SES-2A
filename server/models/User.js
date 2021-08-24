const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

// @Desc Database schema for user entity

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    scores: [{
        title: {
            type: String,
            required: true
        },
        rating: {
            type: Float,
            required: true
        },
        date: {
            type: Date
        }
    }
    ]
});

module.exports = mongoose.model('user', UserSchema);