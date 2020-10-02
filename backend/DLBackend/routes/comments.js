const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

//get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find()
        res.json(comments)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//getting one comment
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment)
})

//getting all commets by post id
router.get('/postId=/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({
            postId: req.params.postId
        })
        res.json(comments)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//creating a comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        body: req.body.body,
        username: req.body.username,
        postId: req.body.postId,
    })
    try {
        const newComment = await comment.save()
        res.status(201).json(newComment)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

//updating a comment
router.patch('/:id', getComment, async (req, res) => {
    if (req.body.body != null) {
        res.comment.body = req.body.body
    }
    if (req.body.upvotes != null) {
        res.comment.upvotes = req.body.upvotes
    }
    if (req.body.liked_by != null) {
        res.comment.liked_by = req.body.liked_by
    }
    if (req.body.disliked_by != null) {
        res.comment.disliked_by = req.body.disliked_by
    }
    try {
        const updatedComment = await res.comment.save()
        res.json(updatedComment)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

//deleting a comment
router.delete('/:id', getComment, async (req, res) => {
    try {
        await res.comment.remove()
        res.json({
            message: 'Comment Deleted!'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getComment(req, res, next) {
    let comment
    try {
        comment = await Comment.findById(req.params.id)
        if (comment == null) {
            return res.status(404).json({
                message: 'Cannot find comment'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.comment = comment
    next()
}

module.exports = router