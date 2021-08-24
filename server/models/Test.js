const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

// @Desc Database schema for test entity

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    participantEmails: {
        type: [String],
        required: true
    },
    maximumAttempts: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    expiryDate: {
        type: Date,
        required: false
    },
    testLength: {
        type: Date,
        required: false
    },
    contentType: {
        type: String,
        required: true
    },
    scores: [{
        name: {
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
    }],
    questions: [{
        category: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        rating: {
            type: Float,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        }
    }]
});


module.exports = mongoose.model('test', TestSchema);