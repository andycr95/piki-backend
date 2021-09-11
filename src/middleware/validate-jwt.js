const jwt = require('jsonwebtoken');
const db = require('../models');
const validateJWT = async ( req, res, next ) => {
    const token = req.header('x-token');
    console.log(token);
    if( !token) return res.status( 401 ).json({ message: 'No hay token en la peticion'});
    try {
        const { uid } = jwt.verify( token, process.env.SECRET );
        const user = await db.user.findByPk( uid );
        if( !user ) res.status( 401 ).json({ message: 'Token no valido'});
        if( !user.status ) res.status( 401 ).json({ message: 'Token no valido'});
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status( 401 ).json({ message: 'Token no valido'});
      
    }
    
}

module.exports = { validateJWT };