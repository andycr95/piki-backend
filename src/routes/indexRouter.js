
const { Router } = require('express');
const router = Router();

router.use("/login", require('./authRouter'));
router.use('/usuarios',require('./userRouter'));
router.use("/conductores", require('./driverRouter'));
router.use("/lineas", require('./lineRouter'));
router.use("/tipos", require('./typeRouter'));
router.use("/clientes", require('./clientRouter'));
router.use("/patios", require('./yardRouter'));
router.use("/contenedores", require('./containerRouter'));
router.use("/turnos", require('./shiftRouter'));
router.use("/clases-turnos", require('./shiftClassRouter'));
router.use("/empresas", require('./companyRoutes'));
router.use("/roles", require('./roleRoutes'));
router.use("/management", require('./managementRouter'));


module.exports = router;