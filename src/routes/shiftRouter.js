
const { Router } = require('express');
const router = Router();
const shiftController = require('../controllers/shiftController');

router.post('/', shiftController.post);
router.get('/', shiftController.get);
router.get('/:id', shiftController.getShift);



module.exports = router;