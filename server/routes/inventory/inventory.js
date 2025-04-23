const express = require('express');
const router = express.Router();
const controller = require('../../controllers/inventory/inventoryController');

// retrieve inventory
router.get('/', controller.getInventory);

module.exports = router;