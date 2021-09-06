const { Router } = require('express');
const router = Router();
const shiftController = require('../controllers/shiftController');

router.get('/', shiftController.get);
router.get('/getFilter', shiftController.getFilter);
router.get('/:id', shiftController.getShift);
router.post('/', shiftController.post);  


module.exports = router;