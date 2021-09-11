const { Router } = require('express');
const router = Router();
const shiftClassController = require('../controllers/shiftClassController');

router.get('/getAllReport', shiftClassController.getAllReport);
router.get('/', shiftClassController.get);
router.post('/', shiftClassController.create);
router.put('/:id', shiftClassController.update);
router.delete('/:id', shiftClassController.delete);

module.exports = router;