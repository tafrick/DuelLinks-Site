const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    username: {
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
    upvotes: {
        type: Number,
        default: 0
    },
    liked_by: [{
        type: String,
        required: true,
        default: []
    }],
    disliked_by: [{
        type: String,
        required: true,
        default: []
    }],
    category: {
        type: String,
        required: true
    },
    image_src: {
        type: String
    }
})

module.exports = mongoose.model('Post', postSchema)