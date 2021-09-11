
const { Router } = require('express');
const router = Router();
const typeController = require('../controllers/typeController');

router.post('/', typeController.create);
router.get('/', typeController.get);
router.put('/:id', typeController.update);
router.delete('/:id', typeController.delete);
router.get('/containers', typeController.getWithContainers);
router.get('/getAllReport', typeController.getAllReport)

module.exports = router;