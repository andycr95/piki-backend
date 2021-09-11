const { Router } = require('express');
const router = Router();
const yardController = require('../controllers/yardController');

router.get('/getAllReport', yardController.getAllReport);
router.get('/', yardController.get);
router.post('/', yardController.create);
router.put('/:id', yardController.update);
router.delete('/:id', yardController.delete);

module.exports = router;