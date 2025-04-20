const express = require('express');
const router = express.Router();
const controller = require('../../controllers/general/distributorController');

router.get('/', controller.getAllDistributors);

module.exports = router;