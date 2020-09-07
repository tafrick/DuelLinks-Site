const express = require('express')
const router = express.Router()
const Post = require('../models/post')

//getting all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//getting one post
router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})

//creating a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        author: req.body.author,
    })
    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
})

//Updating one post
router.patch('/:id', getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title
    }
    if (req.body.author != null) {
        res.post.author = req.body.author
    }
    if (req.body.comments != null) {
        res.post.comments = req.body.comments
    }
    if (req.body.likes != null) {
        res.post.likes = req.body.likes
    }
    if (req.body.dislikes != null) {
        res.post.dislikes = req.body.dislikes
    }
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

//deleting one post
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove()
        res.json({
            message: 'Deleted Post'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getPost(req, res, next) {
    let post
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({
                message: 'Cannot find Post!'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.post = post
    next()
}


module.exports = router