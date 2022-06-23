const express = require('express');
const router = express.Router()
const Aggregate = require('../controller/aggregateController');


router.post('/create', Aggregate.createData_1)
router.post('/comparision', Aggregate.comparision)
router.post('/logical', Aggregate.logical)
router.get('/addFields', Aggregate.addFields)
router.get('/buckets', Aggregate.buckets)
router.get('/bucketAuto', Aggregate.bucketAuto)
router.get('/collStats', Aggregate.collStats)
router.get('/count', Aggregate.count)
router.get('/currentOp', Aggregate.currentOp)
router.get('/facet', Aggregate.facet)
router.get('/mixed', Aggregate.aggregateMixed)
router.post('/human', Aggregate.createHuman)
router.get('/lookup/:id', Aggregate.lookUp)


module.exports= router
