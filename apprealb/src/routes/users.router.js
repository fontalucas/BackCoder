const express = require('express')

const { Router } = express

const router = Router()
let arraydeUsuarios = [{
    nomre: 'Lore',
    apellido: 'Fonta',
    id: 1,
    correo: 'asdklask@gmail.com',
    id: '1',
    genero: 'F'

},
{
    nomre: 'Martin',
    apellido: 'Fonta',
    id: 1,
    correo: 'asdklask@gmail.com',
    id: '2',
    genero: 'M'
},
{
    nomre: 'Lucas',
    apellido: 'Fonta',
    id: 1,
    correo: 'asdklask@gmail.com',
    id: '3',
    genero: 'F'
}

]

router.get('/', (req, res) => {
    res.status(200).send('arrayUsuarios')
})


router.post('/', (req, res) => {

    let user = req.body

    if (!user.nombre || !user.apellido){
        return res.status(404).send({mensaje: 'pasar bien usuarios'})
    }

    console.log(user)
    arraydeUsuarios.push(user)
    res.status(201).send({
        user,
        message: 'se creo'
    })
})

router.delete('/', (req, res) => {

    const {userId} = req.params

    let arrayTamano = arraydeUsuarios.length
    let users = arraydeUsuarios.slice(user => user.id !== userId)
    
    res.status(200).send({mensaje: 'usuario borrado'}, users)
})

module.exports = router