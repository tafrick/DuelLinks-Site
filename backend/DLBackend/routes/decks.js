const express = require('express')
const router = express.Router()
const Deck = require('../models/deck')

//getting all decks
router.get('/', async (req, res) => {
    try {
        const decks = await Deck.find().sort({
            datePosted: -1
        }).limit(50)
        res.json(decks)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//getting one deck
router.get('/:id', getDeck, (req, res) => {
    res.json(res.deck)
})

//getting posts for a specific category
router.get('/category=/:category', async (req, res) => {
    try {
        const decks = await Deck.find({
            category: req.params.category
        })
        res.json(decks)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//getting posts for a specific category
router.get('/deckGPA=/:deckGPA', async (req, res) => {
    try {
        const decks = await Deck.find({
            "deckGPA": {
                $eq: req.params.deckGPA
            }
        })
        res.json(decks)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//creating a deck
router.post('/', async (req, res) => {
    const deck = new Deck({
        title: req.body.title,
        username: req.body.username,
        mainDeck: req.body.mainDeck,
        extraDeck: req.body.extraDeck,
        category: req.body.category
    })
    try {
        const newDeck = await deck.save()
        res.status(201).json(newDeck)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.patch('/:id', getDeck, async (req, res) => {
    if (req.body.title != null) {
        res.deck.title = req.body.title
    }
    if (req.body.mainDeck != null) {
        res.deck.mainDeck = req.body.mainDeck
    }
    if (req.body.extraDeck != null) {
        res.deck.extraDeck = req.body.extraDeck
    }
    if (req.body.category != null) {
        res.deck.category = req.body.category
    }
    if (req.body.totalPoints != null) {
        res.deck.totalPoints = req.body.totalPoints
    }
    if (req.body.totalVotes != null) {
        res.deck.totalVotes = req.body.totalVotes
    }
    if (req.body.deckGPA != null) {
        res.deck.deckGPA = req.body.deckGPA
    }
    if (req.body.graders != null) {
        res.deck.graders = req.body.graders
    }
    try {
        const updatedDeck = await res.deck.save()
        res.json(updatedDeck)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.delete('/:id', getDeck, async (req, res) => {
    try {
        await res.deck.remove()
        res.json({
            message: 'Deleted Deck'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getDeck(req, res, next) {
    let deck
    try {
        deck = await Deck.findById(req.params.id)
        if (deck == null) {
            return res.status(404).json({
                message: 'Cannot find the deck'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.deck = deck
    next()
}

module.exports = router