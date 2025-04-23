const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/pharmacistController');

// retrieve all pharmacists
router.get('/', controller.getAllPharmacists);

module.exports = router;