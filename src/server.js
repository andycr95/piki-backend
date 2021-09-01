const express = require('express');
const cors = require('cors');
const { dbConnetion, dbConnetionNew } = require('./database/config');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.indexPath = '/api';

        // Connect to database
       this.conectarDB();


        // Middlewares
        this.middlewares();

        // Paths of my application
        this.routes();
    }

    async conectarDB() {
        try {
            await dbConnetionNew.authenticate({
                force: true,
            });
            console.log('Database online');
        } catch (error) {
            throw new Error( error );
        }
     
    } 

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Reading and parsing the body
        this.app.use( express.json() );

        // Public Directory
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.indexPath, require('./routes/indexRouter'));
        this.app.use("/conductores", require('./routes/driverRouter'));
        this.app.use("/lineas", require('./routes/lineRouter'));
        this.app.use("/tipos", require('./routes/typeRouter'));
        this.app.use("/clientes", require('./routes/clientRouter'));
        this.app.use("/patios", require('./routes/yardRouter'));
        this.app.use("/contenedores", require('./routes/containerRouter'));
        this.app.use("/turnos", require('./routes/shiftRouter'));
        this.app.use("/asignar_contenedores", require('./routes/asignContainerRouter'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }

}




module.exports = Server;
