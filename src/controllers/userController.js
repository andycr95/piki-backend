const { response, request } = require('express');
const Users = require('../models/userModel')
const userCtrl = {};


 userCtrl.getUser = async (req, res ) => {

  const users = await users.findAll();

    res.json(users);
}

userCtrl.usuariosPost = async ( req, res ) => {

    const { name, email, password } = req.body;

    res.json({
        msg: 'post API - usuariosPost',
        name, 
        email,
        password
    });
}


module.exports = userCtrl;