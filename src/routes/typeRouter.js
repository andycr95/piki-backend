
const { Router } = require('express');
const router = Router();
const typeController = require('../controllers/typeController');

router.post('/', typeController.post);
router.get('/', typeController.get);
router.get('/containers', typeController.getWithContainers);



module.exports = router;