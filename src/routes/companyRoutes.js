const { Router } = require('express');
const router = Router();
const companyController = require('../controllers/companyController');



router.get('/', companyController.getCompany);
router.post('/', companyController.newCompany);
router.put('/:id', companyController.updateCompany);
router.put('/eliminar/:id', companyController.deleteCompany);



module.exports = router;