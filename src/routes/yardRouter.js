const { Router } = require('express');
const router = Router();
const yardController = require('../controllers/yardController');

router.post('/', yardController.post);
router.get('/', yardController.get);
router.get('/getAllReport', yardController.getAllReport)

module.exports = router;