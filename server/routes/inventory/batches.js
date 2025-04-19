const express = require('express');
const router = express.Router();
const controller = require('../../controllers/inventory/batchController');

router.get('/', controller.getAllBatchesInfo);

module.exports = router;