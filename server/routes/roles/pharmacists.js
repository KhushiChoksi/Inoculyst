const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/pharmacistController');

router.get('/', controller.getAllPharmacists);

module.exports = router;