const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/accountController');

router.get('/', controller.getAllAccounts);

// update account type
router.put('/:id/account-type', controller.updateAccountType);

module.exports = router;