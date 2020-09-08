const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    id: {
        type: String,
    }
})

module.exports = mongoose.model('Comment', commentSchema)