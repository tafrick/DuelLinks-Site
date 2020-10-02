const express = require('express')
const router = express.Router()
const Box = require('../models/box')

//Getting all boxes
router.get('/', async (req, res) => {
    try {
        const boxes = await Box.find()
        res.json(boxes)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Getting one box
router.get('/:id', getBox, (req, res) => {
    res.json(res.box)
})

//Creating a box
router.post('/', async (req, res) => {
    const box = new Box({
        name: req.body.name,
        cardsIn: req.body.cardsIn,
        releaseDate: req.body.releaseDate,
        img_src: req.body.img_src
    })
    try {
        const newBox = await box.save()
        res.status(201).json(newBox)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
//Updating one
router.patch('/:id', getBox, async (req, res) => {
    if (req.body.name != null) {
        res.box.name = req.body.name
    }
    if (req.body.cardsIn != null) {
        res.box.cardsIn = req.body.cardsIn
    }
    if (req.body.img_src != null) {
        res.box.img_src = req.body.img_src
    }
    try {
        const updatedBox = await res.box.save()
        res.json(updatedBox)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
//deleting one
router.delete('/:id', getBox, async (req, res) => {
    try {
        await res.box.remove()
        res.json({
            message: 'Deleted Box'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getBox(req, res, next) {
    let box
    try {
        box = await Box.findById(req.params.id)
        if (box == null) {
            return res.status(404).json({
                message: 'Cannot find box'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.box = box
    next()
}

module.exports = router