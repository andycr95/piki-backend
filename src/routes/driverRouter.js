
const { Router } = require('express');
const router = Router();
const driverController = require('../controllers/driverController');

router.post('/', driverController.post);
router.get('/', driverController.get);
router.get('/buscar', driverController.search);



module.exports = router;