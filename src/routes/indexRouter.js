
const { Router } = require('express');
const router = Router();


router.use('/usuarios',require('./userRouter'));
router.use('/empresas',require('./companyRoutes'));


module.exports = router;