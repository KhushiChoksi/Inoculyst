const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/assistantController');

// retrieve all assistants
router.get('/', controller.getAllAssistants);

module.exports = router;