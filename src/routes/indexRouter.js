
const { Router } = require('express');
const router = Router();


router.use('/usuarios',require('./userRouter'));


module.exports = router;