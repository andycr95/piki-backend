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
                 
                },
                {model: db.role, as: 'role' }
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
        newUser.name = newUser.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( newUser.password, salt );
        await db.user.create( newUser ).then(() => {
        return res.status( 200 ).json({ user: newUser, message: 'Registro exitoso', status: true});
        });
        
    }catch (error) {
        return  res.send({message: error.message, status: false});
    }
} 

 

userCtrl.updateUser = async ( req, res ) => {
    try {
        const { id } = req.params;
        let updateUser  = req.body; 
        updateUser.name = updateUser.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        const foundUser = await db.user.findByPk( id );
        if( !foundUser ) return res.status( 400 ).json({ message: `La empresa no esta registrada` });
        await foundUser.update( updateUser ).then(() => {
         return res.status( 200 ).json({ message: 'Actualizacion exitosa', updateUser });
        });
       
    } catch (error) {
        return  res.send({message: error.message});
    } 
}  

userCtrl.deleteUser = async ( req, res ) => {
    const { id } = req.params;
    try {
        const user = await db.user.findByPk( id );
        if( !user ) return res.status( 400 ).json( { message: `El usuario no existe` });
        await user.update({ status: false }).then(() => {
        return res.status( 200 ).json({ user, message: 'Registro eliminado' });
         });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
}  



module.exports = userCtrl;