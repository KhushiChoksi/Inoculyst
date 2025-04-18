const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/accountController');

router.get('/', controller.getAllAccounts);

module.exports = router;