const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/accountController');

// retrieve all accounts
router.get('/', controller.getAllAccounts);

// update account information
router.put('/:id/account-type', controller.updateAccountType);
router.put('/:id/password', controller.updateAccountPassword);
router.put('/:id/username', controller.updateAccountUsername);

module.exports = router;