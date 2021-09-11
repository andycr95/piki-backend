
const { Router } = require('express');
const router = Router();
const lineController = require('../controllers/lineController');

router.get('/getAllReport', lineController.getAllReport)
router.get('/', lineController.get);
router.post('/', lineController.create);
router.put('/:id', lineController.update);
router.delete('/:id', lineController.delete);

module.exports = router;