
const { Router } = require('express');
const router = Router();
const clientController = require('../controllers/clientController');

router.post('/', clientController.post);
router.get('/', clientController.get);
router.get('/buscar', clientController.searchclient);
router.get('/getAllReport', clientController.getAllReport)


module.exports = router;