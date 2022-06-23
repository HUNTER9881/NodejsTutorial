const mongoose = require('mongoose')
const { database, databaseCheck } = require('../config/config')
const connection = async () => {
    mongoose.connect(database, databaseCheck)
        .then(() => { console.log(`Mongodb is running`) })
        .catch((error) => { console.log(error) })
}
module.exports = connection