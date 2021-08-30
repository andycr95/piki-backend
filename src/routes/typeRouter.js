
const { Router } = require('express');
const router = Router();
const typeController = require('../controllers/typeController');

router.post('/', typeController.post);
router.get('/', typeController.get);



module.exports = router;