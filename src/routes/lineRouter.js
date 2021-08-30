
const { Router } = require('express');
const router = Router();
const lineController = require('../controllers/lineController');

router.post('/', lineController.post);
router.get('/', lineController.get);



module.exports = router;