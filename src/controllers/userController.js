const bcrypt = require('bcrypt');
const userCtrl = {};
const User = require('../models/userModel');

userCtrl.getUser = async ( req, res ) => {
    try {
        const users = await User.findAll();  
        if( !users ) return res.status( 404 ).json({ message: 'No se encontraron usuarios'});
        res.json(users);
      
    } catch (error) {
        return  res.send({message: error.message});
    } 
}

userCtrl.newUser = async ( req, res ) => {
    const { nombre, login,  clave, ident, telefono, correo, empresa, tipo, creador } = req.body;
    try {
        const findEmail = await User.findOne({ where: { correo: correo} });
        console.log(correo);
        if( findEmail ) return res.status( 400 ).json( { message: `El correo ${ correo } ya esta en uso`  });
        const findIdent = await User.findOne({ where: { ident: ident} });
        console.log(findIdent);
        if( findIdent ) return res.status( 400 ).json( { message: `La cedula  ${ ident } ya esta en uso`  });
        const salt = bcrypt.genSaltSync();
        req.body.clave = bcrypt.hashSync( req.body.clave, salt );
        const newUser = await User.create(req.body).then(() => {
            return res.status( 200 ).json({ message: true });
        });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
} 

userCtrl.updateUser = async ( req, res ) => {
    const { id } = req.params;
    const { nombre, telefono, tipo } = req.body;
    try {
        const user = await User.findByPk( id );
        if( !user ) return res.status( 400 ).json( { message: `El usuario no existe` });
       await user.update( req.body ).then(() => {
        return res.status( 200 ).json({ user });
       });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
}  

userCtrl.updateUser = async ( req, res ) => {
    const { id } = req.params;
    const { nombre, telefono, tipo } = req.body;
    try {
        const user = await User.findByPk( id );
        if( !user ) return res.status( 400 ).json( { message: `El usuario no existe` });
       await user.update( req.body ).then(() => {
        return res.status( 200 ).json({ user, message: 'El usuario a sido actualizado' });
       });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
}  

userCtrl.deleteUser = async ( req, res ) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk( id ).then(() => {
            if( !user ) return res.status( 400 ).json( { message: `El usuario no existe` });
        });
       await user.update({ estado: false }).then(() => {
        return res.status( 200 ).json({ user });
       });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
}  



module.exports = userCtrl;