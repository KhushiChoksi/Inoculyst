const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/ownerController');

// retrieve all owners
router.get('/', controller.getAllOwners);

module.exports = router;