const mongoose = require('mongoose')
const { Schema } = mongoose

const loginSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    names:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    tel:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    cart:{
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('usuarios', loginSchema)