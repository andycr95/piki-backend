const jwt = require('jsonwebtoken');

const generateJWT = ( uid= '' ) => {
    const payload = { uid };
    jwt.sign( payload, process.env.SECRET, {
        expiresIn: '4h'
    }, ( err, token ) => {
        if(err){
            console.log( err );
            return 'No se pudo generar el token';
        }else {
            console.log(token);
            return token;
        }
    });
}

module.exports = { generateJWT };