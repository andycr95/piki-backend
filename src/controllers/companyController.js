const companyCtrl = {};
const Company = require('../models/company');

companyCtrl.getCompany = async ( req, res ) => {
    try {
        const company = await Company.findAll({ where:{ status:true }});
        return res.status(200).json({ company });
    } catch (error) {
        return  res.json({ data: company, message: error.message});
    } 
}

companyCtrl.newCompany = async ( req, res ) => {
    try {
        const { nombre } = req.body; 
        Company.create(req.body);
        return res.status( 200 ).json({ message: 'Registro exitoso'});
    
    } catch (error) {
        return  res.send({message: error.message});
    } 
} 

companyCtrl.updateCompany = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body; 
        const company = await Company.findByPk( id );
        if( !company ) return res.status( 400 ).json({ message: `La empresa no esta registrada` });
        await company.update( req.body ).then(() => {
         return res.status( 200 ).json({ message: 'Actualizacion exitosa' });
        });
       
    
    } catch (error) {
        return  res.send({message: error.message});
    } 
} 

companyCtrl.deleteCompany = async ( req, res ) => {
    try {
        const { id } = req.params;
        const company = await Company.findByPk( id );
        await company.update({ status: false }).then(() => {
         return res.status( 200 ).json({ message: 'Registro eliminado' });
        });
    } catch (error) {
        return  res.send({message: error.message});
    } 
} 
module.exports = companyCtrl;