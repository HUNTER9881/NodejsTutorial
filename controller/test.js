const {
    QueryModel
} = require('../models/queryModal')
const NodeCache = require("node-cache");
const myCache = new NodeCache();


const client = require('../config/redis')

exports.testingQueriData = async (req, res, next) => {
    const GLOBAL_TIME = new Date()
    process.stdout.write(" --------------------   Test started  -------------------- ")
    async function getAllData() {
        const TIME = new Date()
        const workers = await QueryModel.find().limit(10000) // [{}, {}]
        console.log("--------------------   Data count  -------------------- ", workers.length)
        console.log("--------------------   Start time  -------------------- ", `${(new Date() - TIME) / 1000} sekund`)
    }
    try {
        await getAllData()
    } catch (error) {
        console.log("Message: ", error)
    } finally {
        console.log("--------------------   End time  -------------------- ", `${(new Date() - GLOBAL_TIME) / 1000} sekund`)
        process.exit()
    }
}
exports.node_cashe = async (req, res, next) => {

    // Single value uchun
    // const setCashe = myCache.set("user", "Shahriyor") // set cashe
    // const getCashe = myCache.get("user") // get cashe


    // Multiple uchun
    const User = await QueryModel.find().limit(1000)
    User.forEach((element, index) => {
        myCache.mset([{
            key: "lll" + index.toString(),
            val: element,
        }, ])
    });


    const arrayWorker = []
    for (let index = 0; index < 1000; index++) {
        arrayWorker.push(`lll${index}`)
    }

    const WorkerGet = myCache.mget(arrayWorker)



    res.json(WorkerGet)
}
exports.redis = async (req, res, next) => {
    // const User = await QueryModel.find().limit(10000)

    // User.forEach(async (element, index) => {
    //     (await client).SADD("mn", element.toString(), (error, data) => {
    //         if (error) {
    //             console.log(error)
    //         }
    //         console.log(data)
    //     })
    // })


    (await client).SMEMBERS("mn").then((data) => {
        data.forEach((element) => {
            res.json(JSON.stringify(element))
        })
    }).catch((error) => {
        console.log(error)
    })

}