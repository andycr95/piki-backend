const companyCtrl = {};
const db = require('../models');

companyCtrl.getCompany = async ( req, res ) => {
    try {
        const companies = await db.company.findAll({ where:{ status:true }});
        return res.status(200).json({ companies });
    } catch (error) {
        return  res.json({ data: companies, message: error.message});
    } 
}

companyCtrl.newCompany = async ( req, res ) => {
    try {
        let newCompany  = req.body; 
        newCompany.name = newCompany.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        console.log(newCompany.name);
        db.company.create( newCompany );
        return res.status( 200 ).json({ message: 'Registro exitoso'}); 
        
    } catch (error) {
        return  res.send({message: error.message});
    } 
} 

companyCtrl.updateCompany = async ( req, res ) => {
    try {
        const { id } = req.params;
        let newCompany  = req.body; 
        newCompany.name = newCompany.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        const foundCompany = await db.company.findByPk( id );
        if( !foundCompany ) return res.status( 400 ).json({ message: `La empresa no esta registrada` });
        await foundCompany.update( newCompany ).then(() => {
         return res.status( 200 ).json({ message: 'Actualizacion exitosa' });
        });
       
    } catch (error) {
        return  res.send({message: error.message});
    } 
} 

companyCtrl.deleteCompany = async ( req, res ) => {
    try {
        const { id } = req.params;
        const company = await db.company.findByPk( id );
        await company.update({ status: false }).then(() => {
         return res.status( 200 ).json({ message: 'Registro eliminado' });
        });
    } catch (error) {
        return  res.send({message: error.message});
    } 
}  
module.exports = companyCtrl;