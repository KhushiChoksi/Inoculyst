const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/technicianController');

router.get('/', controller.getAllTechnicians);

module.exports = router;