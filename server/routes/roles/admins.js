const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/adminController');

router.get('/', controller.getAllAdmins);

module.exports = router;