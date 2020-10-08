const express = require('express')
const router = express.Router()
const Post = require('../models/post')

//getting all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({
            date: -1
        }).limit(50)
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

//getting posts for a specific category
router.get('/category=/:category', async (req, res) => {
    try {
        const posts = await Post.find({
            category: req.params.category
        })
        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//getting posts for a specific category
router.get('/username=/:username', async (req, res) => {
    try {
        const posts = await Post.find({
            username: req.params.username
        })
        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//creating a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        username: req.body.username,
        description: req.body.description,
        category: req.body.category,
        image_src: req.body.image_src
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
    if (req.body.username != null) {
        res.post.username = req.body.username
    }
    if (req.body.comments != null) {
        res.post.comments = req.body.comments
    }
    if (req.body.upvotes != null) {
        res.post.upvotes = req.body.upvotes
    }
    if (req.body.image_src != null) {
        res.post.image_src = req.body.image_src
    }
    if (req.body.description != null) {
        res.post.description = req.body.description
    }
    if (req.body.category != null) {
        res.post.category = req.body.category
    }
    if (req.body.liked_by != null) {
        res.post.liked_by = req.body.liked_by
    }
    if (req.body.disliked_by != null) {
        res.post.disliked_by = req.body.disliked_by
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