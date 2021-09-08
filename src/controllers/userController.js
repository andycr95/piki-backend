const bcrypt = require('bcrypt');
const userCtrl = {};
const db = require('../models');
const { Sequelize } = require('../models');

userCtrl.getUser = async ( req, res ) => {
    try {
        const users = await db.user.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: db.company,
                    where: { id: Sequelize.col('companyId')}
                }
            ]
        });  
        if( !users ) return res.status( 404 ).json({ message: 'No se encontraron usuarios'});
        res.json(users);
      
    } catch (error) {
        return  res.send({message: error.message});
    } 
}

userCtrl.newUser = async ( req, res ) => {
    const newUser = req.body;
    try {
        const findEmail = await db.user.findOne({ where: { email: newUser.email} });
       
        if( findEmail ) return res.status( 400 ).json( { message: `El correo ${ newUser.email } ya esta en uso`  });
        const findIdent = await db.user.findOne({ where: { identification: newUser.identification} });
        if( findIdent ) return res.status( 400 ).json( { message: `La cedula  ${ newUser.identification } ya esta en uso`  });
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( newUser.password, salt );
        await db.user.create( newUser ).then(() => {
        return res.status( 200 ).json({ user: newUser, message: true });
        });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
} 

userCtrl.updateUser = async ( req, res ) => {
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

userCtrl.updateUser = async ( req, res ) => {
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

userCtrl.deleteUser = async ( req, res ) => {
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
}  



module.exports = userCtrl;