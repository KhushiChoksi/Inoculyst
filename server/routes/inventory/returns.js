const express = require('express');
const router = express.Router();
const controller = require('../../controllers/inventory/returnsController');

// retrieve returned batch information
router.get('/', controller.getAllReturnedBatches);

// add returned batch
router.post('/add-returned-batch', controller.addReturnedBatch);

module.exports = router;