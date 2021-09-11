
const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController');

router.post('/', authController.login);
/* router.get('/', clientController.get);
router.get('/buscar', clientController.searchclient); */



module.exports = router;