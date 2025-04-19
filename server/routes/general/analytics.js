const express = require('express');
const router = express.Router();
const controller = require('../../controllers/general/analyticsController');

// retrieve analytics data
router.get('/', controller.getUpdateDate);
router.get('/expired-batches', controller.getExpiredBatches);
router.get('/expiring-batches', controller.getExpiringBatches);
router.get('/newly-added-batches', controller.getNewlyAddedBatches);

// update analytics data
router.post('/update/expired', controller.updateExpiredBatches);
router.post('/update/upcoming', controller.updateExpiringBatches);
router.post('/update/new', controller.updateNewlyAddedBatches);


module.exports = router;