const { Router } = require('express');
const router = Router();
const shiftController = require('../controllers/shiftController');

router.get('/', shiftController.get);
router.get('/:id', shiftController.getShift);
router.get('/tipo/:type', shiftController.getWithType);
router.post('/', shiftController.post);  
router.post('/getFilter', shiftController.getFilter);

module.exports = router;