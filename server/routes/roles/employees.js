const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/employeeController');

router.get('/', controller.getAllEmployees);

module.exports = router;