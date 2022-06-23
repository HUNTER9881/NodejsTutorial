const mongoose = require('mongoose');

const demo = mongoose.Schema({
    name: { type: String, required: true },
    
}, { timestamps: true })


const Human = mongoose.model('human', demo)

module.exports = {
    Human
}