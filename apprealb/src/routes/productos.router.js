const express = require('express')
const  ProductManager  = require('../Daos/productManagerFile')
const { Router } = express

const router = Router()

const productManager = new ProductManager




router.get('/', async (req, res) => {
    const product = await productManager.getProduct()
    res.status(200).send(product)
})

router.get('/:pid', async (req, res) => {
    const {pid} = req.params
    try {
        const product = await productManager.getProduct()
        pid = product.find(producto => producto.id === pid)
        res.status(200).send(product)
    }catch (error){
        console.log(error)
    }
})


router.post('/', async (req, res) => {
    const product = req.body
    try{
        const resp = await productManager.addProduct(product)
        res.status(200).send({
            mensaje: resp,
            product
        })
    }catch(err) {
            console.log(err)
        }
})

router.put('/:pid', async (req, res) => {
    const {pid} = req.params
    const obj = {
        title,
        price,
        sotck,
        category,
        thumbnail
        
    }
    try{
        await productManager.updateProduct(pid, obj)
        res.status(200).send({
            mensaje: 'Productos actualizados',
            pid,
            obj
        })
    }catch(err) {
            console.log(err)
        }
})



module.exports = router


/* app.get('/products', (req, res) => {
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
}) */