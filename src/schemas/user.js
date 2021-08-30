const Joi = require('@hapi/joi');


const id = Joi.number().required();
const nombre = Joi.string().max(45).required();
const ident = Joi.string().max(12).required();
const login = Joi.string().max(45).required();
const creador = Joi.string().max(45).required();
const telefono = Joi.string().max(12).allow(null).allow('');
const empresa = Joi.string().max(45).required();
const correo = Joi.string().max(45).required();

const createSchema = Joi.object().keys({
    nombre,
    ident,
    login,
    creador,
    telefono,
    empresa,
    correo
});

const updateSchema = Joi.object().keys({
    id,
    telefono,
    empresa

});

module.exports = {
    createSchema,
    updateSchema,
    id
}