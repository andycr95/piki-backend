
const { Router } = require('express');
const router = Router();
const containerController = require('../controllers/containerController');

router.post('/', containerController.post);
router.get('/', containerController.get);

module.exports = router;