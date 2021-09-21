const { Router } = require('express');
const router = Router();
const managementController = require('../controllers/managementController');

router.get('/', managementController.getInfo);
router.get('/canceled', managementController.getCanceled);
router.get('/:id', managementController.getShiftById);
router.put('/save/:id', managementController.saveShift);

module.exports = router;