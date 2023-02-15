require('dotenv').config()

const os = require('os')
const cluster = require('cluster');
const logger = require('./src/utils/logger');

const modo = process.argv[3] || 'fork';
if (modo == 'cluster' && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    
    logger.info(`Primary ${process.pid} is running`);
    logger.info(`número de procesadores: ${numCPUs}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        logger.info(`worker ${worker.process.pid} died`, new Date().toLocaleString());
        cluster.fork();
    })
} else {
    const express = require('express')
    const app = express()

    const morgan = require('morgan');

    const routes = require('./src/routes/index')

    const path = require('path')

    const PORT = parseInt(process.argv[2]) || 8080

    require('./src/db/dbConnection')
    const sessionDBConnection = require('./src/db/sessionDBConnection')

    //middlewares

    app.use(morgan('dev'))
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    app.use(sessionDBConnection)

    app.use(express.static(__dirname + '/public'))

    app.set('views', path.join(__dirname, './public/views'));
    app.set('view engine', 'ejs');

    //rutas

    app.use(routes)

    //server
    const server = app.listen(PORT, () =>
        logger.info(`Server started on PORT http://localhost:${PORT} --${process.pid} -- at ${new Date().toLocaleString()}`)
    );

    server.on('error', (err) => {
        logger.info('Error en el servidor:', err)
    })

}