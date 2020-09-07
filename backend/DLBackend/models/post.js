const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comments: [{
        type: String
    }],
    id: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('Post', postSchema)