
const { Router } = require('express');
const router = Router();
const shiftController = require('../controllers/shiftController');

router.post('/', shiftController.post);
router.get('/', shiftController.get);



module.exports = router;