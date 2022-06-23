const express = require('express');
const router = express.Router();

const {
    testingQueriData,
    node_cashe, redis
} = require('../controller/test')

router.get('/start', testingQueriData)
router.get('/nodecashe', node_cashe)
router.get('/redis', redis)




module.exports = router