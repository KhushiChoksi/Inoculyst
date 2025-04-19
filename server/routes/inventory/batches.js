const express = require('express');
const router = express.Router();
const controller = require('../../controllers/inventory/batchController');

// retrieve batches
router.get('/', controller.getAllBatchesInfo);

// update a batch
router.put('/:id/quantity', controller.updateBatchQuantity);
router.put('/:id/expiry', controller.updateBatchExpiry);
router.put('/:id/vaccine', controller.updateBatchVaccineType);

// insert batch route
router.post('/add-batch', controller.addNewBatch);

// delete a batch
router.delete('/:id', controller.deleteBatch);

module.exports = router;