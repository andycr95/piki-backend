const { Router } = require('express');
const router = Router();
const roleController = require('../controllers/roleController');
const { validateJWT } = require('../middleware/validate-jwt');



router.get('/', roleController.getRole);
router.post('/', roleController.newRole);
router.put('/:id', roleController.updateRole);
router.delete('/eliminar/:id', roleController.deleteRole); 



module.exports = router;