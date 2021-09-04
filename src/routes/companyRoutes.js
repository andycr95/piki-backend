const { Router } = require('express');
const router = Router();
const companyController = require('../controllers/companyController');
const { validateJWT } = require('../middleware/validate-jwt');



router.get('/', validateJWT, companyController.getCompany);
router.post('/', validateJWT, companyController.newCompany);
router.put('/:id', validateJWT, companyController.updateCompany);
router.put('/eliminar/:id', validateJWT, companyController.deleteCompany);



module.exports = router;