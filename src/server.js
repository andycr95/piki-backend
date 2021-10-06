const express = require('express');
const cors = require('cors');
var morgan = require('morgan')
const http = require('https');
const { dbConnetion, dbConnectionDev } = require('./database/db');

class Server {

    constructor() {
        this.app  = express();
        this.port = 3000;
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
            await dbConnectionDev.authenticate({ force: true });
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

        //morgan
        this.app.use(morgan('dev'))

    }

    routes() {
        this.app.use( this.indexPath, require('./routes/indexRouter'));
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }

}




module.exports = Server;
