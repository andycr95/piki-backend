const { Router } = require('express');
const router = Router();
const shiftClassController = require('../controllers/shiftClassController');

router.get('/getAllReport', shiftClassController.getAllReport)

module.exports = router;