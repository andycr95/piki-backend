const { response, request } = require('express');
const Shift = require('../models/shiftModel')
const shiftCtrl = {};


shiftCtrl.get = async (req, res ) => {

  const users = await users.findAll();

    res.json(users);
}

shiftCtrl.post = async ( req, res ) => {
    const lastShift = await Shift.findOne({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });

    res.json({
        msg: 'post API - lastShift',
        lastShift
    });
}


module.exports = shiftCtrl;