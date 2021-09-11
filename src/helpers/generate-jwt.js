const jwt = require('jsonwebtoken');

const generateJWT = ( uid= '' ) => {
    const payload = { uid };
    return new Promise(( resolve, reject ) => {
      
        jwt.sign( payload, process.env.SECRET, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if(err){
                console.log( err );
                reject('No se pudo generar el token')
            }else {
                console.log(token);
                resolve( token );
            }
        })
    });
}

module.exports = { generateJWT };