const express = require('express');
const router = express.Router();
const controller = require('../../controllers/roles/adminController');

// retrieve all admins
router.get('/', controller.getAllAdmins);

// update information
router.put('/:id/first-name', controller.updateFirstName);
router.put('/:id/last-name', controller.updateLastName);
router.put('/:id/email', controller.updateEmail);
router.put('/:id/phone', controller.updatePhone);

module.exports = router;