// servidor de express
const express = require('express');
//Servidor de sockets
const http = require('http');
const socketio = require('socket.io')
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors')

class Server {
    constructor(){
        
        this.app = express()
        this.port = process.env.PORT
        //http server
        this.server = http.createServer(this.app)
        // Configuracion del socket 
        this.io = socketio(this.server)

    }
    middlewares(){
        //desplegar el directorio publico
        this.app.use(express.static( path.resolve(__dirname, '../public') ))
        //Cors
        this.app.use(cors())
    }

    configurarSockets(){
        new Sockets( this.io )
    }

    execute(){
        //iniciar middlewares
        this.middlewares()

        // iniciar sockets
        this.configurarSockets()

        this.server.listen(this.port, () => {
            console.log('Server corriendo en el puerto:', this.port)
        });
    }



}

module.exports = Server