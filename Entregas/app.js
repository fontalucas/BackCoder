/* const http = require('http');

const server = http.createServer((peticion, respuesta) => {
    respuesta.end('Hola a la primera');

})
server.listen(8080,err=> { 
    console.log('Escuchando en el puerto 8080')
}) */

const express = require('express');
const  { ProductManager } = require('./entregas')
//import express from 'express'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//const product = new ProductManager 

app.get('/products', (req, res) => {
    res.send(ProductManager.getProduct())
})

app.get('/products/', async (req, res) => {
    const { limit } = req.query
    try {
        let productosLimitados = ProductManager.getProduct().filter(product =>  product.id <= limit)
        res.send(productosLimitados) || res.send(ProductManager)
    } catch (error) {
        console.log(error)
    }
    
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = ProductManager.getProduct().find(product => product.id === id)
    if (!product) { return res.send('No existe el producto')}
    res.send(product.id)
    } 
    catch (error) {
        console.log(error)
    }
})

app.listen(PORT, err => {
    if (err) console.log(err)
        console.log(`Escuchando en el puerto ${PORT}`)
})

