const { QueryOperator } = require('../Model')
const express = require('express');
const router = express.Router()


router.post('/create', async (req, res) => {
    // Count
    const count = 20
    const recursion = async (RECURSION_NUMBER) => {
        if (RECURSION_NUMBER > 0) {
            const FirstName = 'ABCDEFGHI'
            const SecondName = 'ABCD'

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
                    name: RANDOM_STRING(FirstName, 3),
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
    const one = {

    }

    const responseData = await QueryOperator.find()
    res.json(responseData)

})





module.exports = router
