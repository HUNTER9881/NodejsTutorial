const mongoose = require('mongoose')

const FirsDemoAggregate = mongoose.Schema({
    last_name: { type: String, required: true },
    first_name: { type: String, required: true },
    count: { type: Number, required: true },
    views: { type: Number, required: true },
    tag: [{ type: String, required: true }],
    ball: [{ type: Number, required: true }],
    countryName: { type: String, required: true },
    price: { type: Number, required: true },
    year_born: { type: Number, required: true },
    year_died: { type: Number, required: true },
    nationality: { type: String, required: true },
    humen_ID: { type: mongoose.Schema.ObjectId, required: true, ref: "human" }
}, {
    timestamps: true
})

const FirstModal = mongoose.model("first", FirsDemoAggregate)


module.exports = { FirstModal }