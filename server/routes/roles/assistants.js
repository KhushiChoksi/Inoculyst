const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/assistantController');

router.get('/', controller.getAllAssistants);

module.exports = router;