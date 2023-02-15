require('dotenv').config()

const mongoose = require('mongoose')
const logger = require('../utils/logger')

const dbConnection = mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ecommercecoderhousesant.6p5agbc.mongodb.net/sessions`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
.then(()=> logger.info('Conectado a Mongodb'))
.catch(err => logger.warn(err))


module.exports = dbConnection