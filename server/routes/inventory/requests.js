const express = require('express');
const router = express.Router();
const controller = require('../../controllers/inventory/requestsController');

// retrieve requests
router.get('/', controller.getAllRequests);
router.get('/pending', controller.getAllPendingRequests);

// update request
router.put('/:id/status', controller.updateRequestStatus);

// add request, update batch table
router.post('/add-request', controller.addNewRequest);
router.post('/update-batch-with-requests', controller.updateBatchFromAcceptedRequests);
router.post('/update-pending-requests', controller.updatePendingRequestsTable);

// delete a request
router.delete('/:id', controller.deleteRequest);

module.exports = router;