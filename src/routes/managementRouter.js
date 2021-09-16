const { Router } = require('express');
const router = Router();
const managementController = require('../controllers/managementController');

router.get('/', managementController.getInfo);

module.exports = router;