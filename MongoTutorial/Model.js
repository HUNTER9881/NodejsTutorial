const mongoose = require('mongoose');

const Query_Operator = mongoose.Schema({
    item: {
        name: { type: String, required: true },
        code: { type: Number, required: true }
    },
    qty: { type: Number, required: true },
    tag: [{ type: String, required: true }]
}, { timestamps: true })

const QueryOperator = mongoose.model('QueryOperator', Query_Operator)

module.exports = { QueryOperator }