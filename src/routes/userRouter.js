
const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');



router.post('/',  userController.newUser);
router.get('/', userController.getUser);
router.put('/:id', userController.updateUser);
router.put('/eliminar/:id', userController.deleteUser);



module.exports = router;