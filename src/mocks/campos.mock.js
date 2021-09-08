const CampoMock = {
    "TURNO DIARIO": "dayShift",
    "CONSECUTIVO": "globalShift",
    "CONDUCTOR O EMPRESA": "clients.name AS clientName",
    "CC O NIT": "clients.nit AS clientNit",
    "PLACA": "drivers.vehicle_plate AS vehiclePlate",
    "CONTENEDOR I": "",
    "CONTENEDOR II": "",
    "TIPO/TAMAÑO": "",
    "LINEA": "transLines.description AS line",
    "DEVOLUCION": "limitDate",
    "INGRESO": "TIME(shifts.createdAt) AS income",
    "PATIO": "containerYards.description AS containerYard",
}

module.exports = { CampoMock }