const CampoMock = {
    "TURNO DIARIO": "dayShift AS 'TURNO DIARIO'",
    "CONSECUTIVO": "globalShift AS CONSECUTIVO",
    "CONDUCTOR O EMPRESA": "clients.name AS 'CONDUCTOR O EMPRESA'",
    "CC O NIT": "clients.nit AS 'CC O NIT'",
    "PLACA": "drivers.vehicle_plate AS PLACA",/* 
    "CONTENEDOR I": "",
    "CONTENEDOR II": "",
    "TIPO/TAMAÑO": "", */
    "LINEA": "transLines.description AS LINEA",
    "DEVOLUCION": "limitDate AS DEVOLUCION",
    "INGRESO": "TIME(shifts.createdAt) AS INGRESO",
    "PATIO": "containerYards.description AS PATIO",
}

module.exports = { CampoMock }