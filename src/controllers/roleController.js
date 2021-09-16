const roleCtrl = {};
const db = require('../models');

roleCtrl.getRole = async ( req, res ) => {
    try {
        const roles = await db.role.findAll({ where:{ status:true }});
        return res.status(200).json(roles);
    } catch (error) {
        return  res.json({ message: error.message });
    } 
}

roleCtrl.newRole = async ( req, res ) => {
    try {
        let newRole  = req.body; 
        console.log(newRole);
        newRole.name = newRole.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        db.role.create( newRole );
        return res.status( 200 ).json({ message: 'Registro exitoso', status: true }); 
        
    } catch (error) {
        return  res.status( 200 ).json({ message: error.message, status: true });
    } 
} 

roleCtrl.updateRole = async ( req, res ) => {
    try {
        const { id } = req.params;
        let newRole  = req.body; 
        const user = req.user;
        newRole.name = newRole.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        const foundRole = await db.role.findByPk( id );
        if( !foundRole ) return res.status( 400 ).json({ message: `El rol no esta registrado` });
        await foundRole.update( newRole ).then(() => {
         return res.status( 200 ).json({ message: 'Actualizacion exitosa', user });
        });
       
    } catch (error) {
        return  res.send({message: error.message});
    } 
} 

roleCtrl.deleteRole = async ( req, res ) => {
    try {
        const { id } = req.params;
        const role = await db.role.findByPk( id );
        if( !role ) return res.status( 400 ).json({ message: `El rol no existe.` });
        await role.update({ status: false }).then(() => {
         return res.status( 200 ).json({ message: 'Registro eliminado' });
        });
    } catch (error) {
        return  res.send({message: error.message});
    } 
}  

 
module.exports = roleCtrl;