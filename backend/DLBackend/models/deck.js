const mongoose = require('mongoose')

const deckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    mainDeck: [{
        id: String,
        name: {
            type: String,
            required: true
        },
        img: {
            type: String
        },
        description: {
            type: String,
            required: true
        }
    }],
    extraDeck: [{
        id: String,
        name: {
            type: String,
            required: true
        },
        img: {
            type: String
        },
        description: {
            type: String,
            required: true
        }
    }],
    totalPoints: {
        type: Number,
        default: 0
    },
    totalVotes: {
        type: Number,
        default: 0
    },
    deckGPA: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    graders: [{
        type: String,
        required: true,
        default: []
    }],
    id: {
        type: String
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Deck', deckSchema)