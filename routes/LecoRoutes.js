const express = require('express');
const router = express.Router();

const lecoController = require('../controllers/LecoController');

router.post('/check-balance', lecoController.checkLecoBalance);

module.exports = router;