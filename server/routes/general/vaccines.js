const express = require('express');
const router = express.Router();
const controller = require('../../controllers/general/vaccineController');

// retrieve vaccines
router.get('/', controller.getVaccines);
router.get('/ingredients', controller.getIngredients);

module.exports = router;