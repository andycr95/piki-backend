
const { Router } = require('express');
const router = Router();


router.use('/usuarios',require('./userRouter'));
router.use('/conductores',require('./driverRouter'));


module.exports = router;