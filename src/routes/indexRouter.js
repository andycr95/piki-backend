
const { Router } = require('express');
const router = Router();


router.use('/usuarios',require('./userRouter'));
router.use('/conductores',require('./driverRouter'));
router.use("/conductores", require('./driverRouter'));
router.use("/lineas", require('./lineRouter'));
router.use("/tipos", require('./typeRouter'));
router.use("/clientes", require('./clientRouter'));
router.use("/patios", require('./yardRouter'));
router.use("/contenedores", require('./containerRouter'));
router.use("/turnos", require('./shiftRouter'));
router.use("/empresas", require('./companyRoutes'));
router.use("/asignar_contenedores", require('./asignContainerRouter'));


module.exports = router;