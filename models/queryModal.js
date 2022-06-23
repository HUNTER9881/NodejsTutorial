const { Schema, model } = require('mongoose');


const QuerySchema = Schema({
    username: { type: String, required: true },
    country: { type: String, required: true },
    company: { type: String, required: true },
    workedYear: { type: Number, required: true },
    salary: {
        january: { type: Number, required: true },
        february: { type: Number, required: true },
        march: { type: Number, required: true },
        april: { type: Number, required: true },
        may: { type: Number, required: true },
        june: { type: Number, required: true },
    },
    bonus: {
        january: { type: Number, required: true },
        february: { type: Number, required: true },
        march: { type: Number, required: true },
        april: { type: Number, required: true },
        may: { type: Number, required: true },
        june: { type: Number, required: true },
    },
    year_born: { type: Number, required: true },
    year_died: { type: Number, required: true },
    position: { type: String, required: true }
})

const CashedData = Schema({
    username: { type: String, required: true, index:true },
    company: { type: String, required: true, index:true },
    workedYear: { type: Number, required: true, index:true },
    year_born: { type: Number, required: true, index:true},
    year_died: { type: Number, required: true, index:true },
    position: { type: String, required: true , index:true}
},{
    timestamps: true
})
CashedData.set('redisCache', true)
CashedData.set('expires', 30)




const QueryModel = model("query", QuerySchema);
const Cashed = model('cashed', CashedData)
module.exports = { QueryModel, Cashed }