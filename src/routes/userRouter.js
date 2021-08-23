
const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

router.post('/', userController.usuariosPost);
router.get('/', userController.getUser);



module.exports = router;