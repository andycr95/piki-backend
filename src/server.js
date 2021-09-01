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
            await dbConnetionNew.authenticate({ force: true });
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
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }

}




module.exports = Server;
