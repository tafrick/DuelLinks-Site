const mongoose = require('mongoose')

const boxSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cardsIn: [{
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
    img_src: {
        type: String
    },
    id: {
        type: String,
    },
    releaseDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Box', boxSchema)