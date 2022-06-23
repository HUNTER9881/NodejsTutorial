const { QueryOperator } = require('../Model')
const express = require('express');
const router = express.Router()


router.post('/create', async (req, res) => {
    // Count
    const count = 20
    const recursion = async (RECURSION_NUMBER) => {
        if (RECURSION_NUMBER > 0) {
            const FirstName = 'ABCDEFGHI'
            const SecondName = 'ABCDE'

            // Random String
            function RANDOM_STRING(string, count) {
                let randomName = '';
                let charactersLength = string.length;
                for (let i = 0; i < count; i++) {
                    randomName += string.charAt(Math.floor(Math.random() * charactersLength))
                }
                return randomName
            }

            // Random Number
            function RANDOM_NUMBER(random_mixed_number) {
                const randomNumbers = Math.floor(Math.random() * random_mixed_number);
                return randomNumbers
            }

            // Create data
            const result = new QueryOperator({
                item: {
                    name: RANDOM_STRING(FirstName, 10),
                    code: RANDOM_NUMBER(10000)
                },
                qty: RANDOM_NUMBER(100),
                tag: [
                    RANDOM_STRING(SecondName, 2),
                    RANDOM_STRING(SecondName, 2),
                    RANDOM_STRING(SecondName, 2),
                ]
            })
            await result.save()
            console.log("Saved")
            // Callback recursion function
            recursion(RECURSION_NUMBER - 1)
        }
    }
    // Counting Recursion function
    recursion(count)
})

router.get('/filter', async (req, res) => {
    const demo_1 = { "item.name": { $eq: "AAFCDEBGFF" } };
    const demo_2 = { "tag": { $eq: "AC" } };
    const demo_3 = { "qty": { $eq: 87 } };
    const demo_4 = { "qty": { $gt: 20 } };
    const demo_5 = { "qty": { $gte: 68 } };
    const demo_6 = { "tag": { $in: ["BB"] } };
    const demo_7 = { "tag": { $nin: ["BB", "DC"] } };
    const demo_8 = { "tag": { $ne: "AC" } };
    const demo_9 = { "qty": { $lt: 50 } };
    const demo_10 = { "qty": { $lte: 38 } };

    const responseData = await QueryOperator.find(demo_1)
    const responseData_2 = await QueryOperator.updateOne(
        { "qty": { $gte: 38 } },
        { $set: { "item.name": "AAAAAAAAAAAA" } }
    )


    res.json(responseData_2)
})


module.exports = router
