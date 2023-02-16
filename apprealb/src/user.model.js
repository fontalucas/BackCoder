const { Schema, model} = require('mongoose')

const userColecction = 'usuarios'
const UserSchema = Schema({
    nombre: {
        type: String,
        require: true,
    },
    apellido: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
})

module.exports = model(userColecction, UserSchema)