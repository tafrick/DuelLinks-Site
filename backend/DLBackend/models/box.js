const mongoose = require('mongoose')

const boxSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cardsIn: [{
        type: String,
    }],
    img_src: {
        type: String,
        default: 'test',
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