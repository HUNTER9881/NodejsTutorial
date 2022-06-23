const express = require('express');
const router = express.Router()
const Query = require('../controller/queryController');



router.post('/create', Query.createData)
router.post('/cashed', Query.casheDataCreate)
router.get('/test', Query.optimisationData)
router.get('/filter', Query.filters)
router.get('/cashing', Query.cashing)
router.post('/index', Query.createIndex)



module.exports = router