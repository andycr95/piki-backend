
const { Router } = require('express');
const router = Router();
const driverController = require('../controllers/driverController');

router.post('/', driverController.post);
router.put('/:id', driverController.update);
router.delete('/:id', driverController.delete);
router.get('/', driverController.get);
router.get('/buscar', driverController.search);



module.exports = router;