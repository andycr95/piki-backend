const CamposMock = {
    "TURNO DIARIO": [{ "field": "dayShift", "table": "shifts"}],
    "CONSECUTIVO": [{ "field": "globalShift", "table": "shifts"}],
    "CONDUCTOR O EMPRESA": [
        { "field": "name", "table": "clients"},
        { "field": "name", "table": "drivers"}
    ],
    "CC O NIT": [
        { "field": "identification", "table": "drivers"},
        { "field": "nit", "table": "clients"}        
    ],
    "PLACA": [{ "field": "vehicle_plate", "table": "drivers"}],
    "CONTENEDORES": [{ "field": "code", "table": "containers"}],
    "TIPO/TAMAÑO": [{ "field": "description", "table": "containerTypes"}],
    "LINEA": [{ "field": "description", "table": "transLines"}],
    "DEVOLUCION": [{ "field": "date", "table": "shifts"}],
    "PATIO": [{ "field": "description", "table": "containerYards"}],
}

const CamposWhereMock = {
    "cliente": { "field": "clientId", "table": "shifts" },
    "linea": { "field": "transLineId", "table": "shifts" },
    "patio": { "field": "containerYardId", "table": "shifts" },
    "clase": { "field": "shiftClassId", "table": "shifts" },
    "tipoTamanioContenedor": { "field": "containerTypeId", "table": "containers" },
}

module.exports = { CamposMock, CamposWhereMock }