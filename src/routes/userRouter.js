
const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const { createSchema, id, deleteSchema, updateSchema } = require('../schemas/user');


router.post('/',  userController.newUser);
router.get('/', userController.getUser);
router.put('/:id', userController.updateUser);



module.exports = router;