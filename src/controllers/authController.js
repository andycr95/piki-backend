const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/generate-jwt');
const authCtrl = {};
const db = require('../models');



authCtrl.login = async ( req, res ) => {
   
    try {
        const {  login, password } = req.body;
        const userFound = await db.user.findOne({ where: { login: login } });
        if( !userFound ) return res.status( 400 ).json({ message: 'El usuario no existe '});
        if( !userFound.dataValues.status ) return res.status( 400 ).json({ message: 'Usuario o contraseña incorrecto '});
        const validPassword = bcrypt.compareSync( password, userFound.dataValues.password );
        if( !validPassword ) return res.status( 400 ).json({ message: 'Usuario o contraseña incorrecto '});
        const token = await generateJWT( userFound.dataValues.id );
     
        return res.status(200).send( {token, user: userFound.dataValues} )
        
    }catch (error) {
        return  res.status( 500 ).send({message: error.message});
    }
} 
/* 
authCtrl.updateUser = async ( req, res ) => {
    const { id } = req.params;
    const { nombre, telefono, tipo } = req.body;
    try {
        const foundUser = await db.user.findByPk( id );
        if( !foundUser ) return res.status( 400 ).json( { message: `El usuario no existe` });
       await foundUser.update( req.body ).then(() => {
        return res.status( 200 ).json({ foundUser });
       });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
}  

authCtrl.updateUser = async ( req, res ) => {
    const { id } = req.params;
    const { nombre, telefono, tipo } = req.body;
    try {
        const user = await db.User.findByPk( id );
        if( !user ) return res.status( 400 ).json( { message: `El usuario no existe` });
       await user.update( req.body ).then(() => {
        return res.status( 200 ).json({ user, message: 'El usuario a sido actualizado' });
       });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
}  

authCtrl.deleteUser = async ( req, res ) => {
    const { id } = req.params;
    try {
        const user = await db.User.findByPk( id ).then(() => {
            if( !user ) return res.status( 400 ).json( { message: `El usuario no existe` });
        });
       await user.update({ estado: false }).then(() => {
        return res.status( 200 ).json({ user });
       });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
}   */



module.exports = authCtrl;