const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.router')
const viewsRouter = require('./routes/views.router')
const productsRouter = require('./routes/productos.router')
const cartRouter = require('./routes/cart.router')
const { uploader } = require('./utils');
const handlebars = require('express-handlebars');
const { Server }  = require('socket.io');
const ProductManager = require('./Daos/productManagerFile');

require('dotenv').config()
//import express from 'express'

const productManager = new ProductManager

const app = express()

const PORT = 8080 || process.env.PORT 


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/virtual', express.static(__dirname+'/public'))
app.use(cookieParser())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('views engine', 'handlebars') 


/* app.get('/', (req, res) => {
    res.render
}) 
 */
/* //middleware de aplicacion.
app.use((req, res, next)=> {console.log('Time: ', Date())
    next()
})

//middleware de endpoint
function mid1(req, res, next) {
    req.dato1='dato uni'
    next()
}
function mid2(req, res, next) {
    req.dato2='dato dos'
    next()
}
 */
app.use('/'/* , mid1 */,viewsRouter)

app.use('/api/usuarios'/* , mid1 */,usersRouter)

app.use('/api/carts'/* , mid2 */, cartRouter)

app.use('/api/products'/* , mid2 */, productsRouter)

app.post('/single', uploader.single('myfile'), (req, res)=> {
        res.status(200).json({mensaje: 'se a subido el archivo con exito'})
})

app.use((err, req, res, next)=> {
        console.log(err)
        res.status(500).send('error')
})

const httpServer = app.listen(PORT, err => {
    if (err) console.log(err)
        console.log(`Escuchando en el puerto ${httpServer.address().port}}`)
})

//instanciando socket
const io = new Server(httpServer)

/* const mensajes = [
    {user: 'Lucas', }
]
let connectedClients = [] */
let products 

//io.on('connection', socket => {
//    console.log('nuevo cliente conectado');
//    connectedClients.push(socket)
//    console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)
io.on('connection', async socket => {
    console.log('nuevo cliente conectado');
    try{
        products = await productManager.getProducts()
        socket.emit('products', products)
    }
    catch(err) {console.log(err)}
    
    //    socket.on('message', data => {console.log(data)
    //    mensajes.push(data)
    //    io.emit('messageLog', mensajes)
    //})
    socket.on('product', async data => {console.log(data)
        const objProd = {
            title,
            description,
        price,
        code,
        stock,
        category,
        
    }
    objProd = data
    try{
        product = await productManager.addProduct({...objProd})
        io.emit('products', product)
    }
    catch (err) {console.log(err)}
})
//
//socket.on('authenticated', (data) =>{
    //    socket.broadcast.emit('newUserConected', data)
    //    console.log('authenticated');
    //})
    
    socket.on('disconnect', () =>{
        console.log('Desconectado');
    })
    
    httpServer.on('eerror', err => {
        console.log(err)
    })
    
})