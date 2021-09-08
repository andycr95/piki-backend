
const { Router } = require('express');
const router = Router();
const containerController = require('../controllers/containerController');

router.post('/', containerController.containerCtrl.post);
router.get('/', containerController.containerCtrl.get);

module.exports = router;