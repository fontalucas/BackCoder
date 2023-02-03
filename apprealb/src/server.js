const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.router')
const viewsRouter = require('./routes/views.router')
const productsRouter = require('./routes/productos.router')
const cartRouter = require('./routes/cart.router')
const { uploader } = require('./utils');
const handlebars = require('express-handlebars');
const {Server}  = require('socket.io')


//import express from 'express'

const app = express()
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/virtual', express.static(__dirname+'/public'))
app.use(cookieParser())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('views engine', 'handlebars') 

app.get('/', (req, res) => {
    res.render
})

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
        console.log()
        res.status(500).send('error')
})

const httpServer = app.listen(PORT, err => {
    if (err) console.log(err)
        console.log(`Escuchando en el puerto ${httpServer.address().port}}`)
})
const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log('nuevo cliente conectado');

    socket.on('mensaje', data => {console.log(data)})

    socket.on('disconnect', () =>{
        console.log('Desconectado');
    })
})

/* httpServer.on('eerror', err => {
    console.log(err)
})
 */

