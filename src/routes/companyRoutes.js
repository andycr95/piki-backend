const { Router } = require('express');
const router = Router();
const companyController = require('../controllers/companyController');
const { validateJWT } = require('../middleware/validate-jwt');



router.get('/', companyController.getCompany);
router.post('/', companyController.newCompany);
router.put('/:id', companyController.updateCompany);
router.delete('/eliminar/:id', companyController.deleteCompany);



module.exports = router;