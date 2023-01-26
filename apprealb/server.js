const express = require('express');

//import express from 'express'

const app = express()
const PORT = 8080

let items = [
    {id:1, nombre: 'Rey Arturo', stock: 15, precio: 900, category: 'linea Golden'},
    {id:2, nombre: 'Magnus', stock: 1, precio: 500, category: 'linea Golden'},
    
    
    {id:3, nombre: 'Maxima', stock: 0, precio: 850, category: 'Linea clasica'},
    {id:4, nombre: 'Isabel', stock: 0, precio: 850, category: 'Linea clasica'},
    {id:5, nombre: 'Victoria', stock: 0, precio: 850, category: 'Linea clasica'},
    
    {id:6, nombre: 'William', stock: 10, precio: 500, category: 'Linea Cheese'},
    {id:7, nombre: 'Charlotte', stock: 10, precio: 500, category: 'Linea Cheese'},
    
    {id:8, nombre: 'Smoke Shack', stock: 15, precio: 1000, category: 'Linea Homenaje'},
    {id:9, nombre: 'Fried Onion', stock: 15, precio: 900, category: 'Linea Homenaje'}
    
]
let arraydeUsuarios = [{
    nomre: 'Lucas',
    apellido: 'Fonta',
    id: 1,
    correo: 'asdklask@gmail.com',
    id: '1',
    genero: 'F'

},
{
    nomre: 'Lucas',
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

app.use(express.urlencoded({extended:true}))

app.get('/bienvenida', (req, res) => {
    res.send('<h1 style="color: blue;">Bienvenidos</h1>')
})

app.get('/', (req, res) => {
    res.send(arraydeUsuarios)
})
app.get('/api/:idUser', (req, res) => {
    const { idUser } = req.params
    const usuario = arraydeUsuarios.find( user => user.id === idUser)
    if (!usuario) { return res.send('No existe usuario') 
    }
    res.send(usuario)
})


/* app.get('/usuario', (req, res) => {
    res.send(usuario)
}) */

/* app.get('/params/:nombre/:id', (req, res) => {
    console.log(req.params)
    const { nombre, id } = req.params
    //res.send('params')
    res.send({nombre, id})
}) */
/* 
app.get('/query', (req, res) => {
    console.log(req.query)
    const { genero } = req.query
    if (!genero || (genero !== 'M' && genero !== 'F'))
    return res.send({genero})

    let usuariosFiltrados = arraydeUsuarios.filter(user => user.genero === genero)
    res.send({usuariosFiltrados})
}) */


app.get('/products', (req, res) => {
    res.send(items)
})

app.get('/products/', (req, res) => {
    const { limit } = req.query
    let primerosProductos = products.id.length(id = 0, id <=5, id++)
    res.send(primerosProductos)
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params
    if (id == 2 ) return res.send(items.id)
})

app.get('/products/:id', (req, res) => {
    console.log(req.params)
    const { id } = req.params
    //res.send('params')
    res.send({id})
})


app.listen(PORT, err => {
    if (err) console.log(err)
        console.log(`Escuchando en el puerto ${PORT}`)
})