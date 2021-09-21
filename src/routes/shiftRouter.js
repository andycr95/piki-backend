const { Router } = require('express');
const router = Router();
const shiftController = require('../controllers/shiftController');

router.get('/', shiftController.get);
router.get('/money', shiftController.getMoney);
router.post('/money', shiftController.postMoneyBoxes);
router.get('/:id', shiftController.getShift);
router.put('/:id', shiftController.update);
router.delete('/:id', shiftController.delete);
router.get('/tipo/:type', shiftController.getWithType);
router.post('/', shiftController.post);  
router.post('/getFilter', shiftController.getFilter);

module.exports = router;