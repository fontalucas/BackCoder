const {Router} = require('express');
const CartManager = require('../Daos/cartManagerFile')
const router = Router()

const Cart = new CartManager

//POST localhost/api/carts
router.post('/', async (req, res) => {
    cart = req.query
    const cart = await Cart.getCartProducts()
    res.status(200).send(cart)
    cart.product = []
    // metodo que tiene la clase para agregar el carrito al archivo
    res.status(200).json({
    mensaje: 'Carrito creado'})
})

//GET localhost/api/carts

/* router.get('/', async (req, res) => {
    const product = await productManager.getProduct()
    res.status(200).send(product)
}) */

router.get('/:cid', async (req, res) => {
    const {cid} = req.params
    try {
        const cart = await Cart.getCartProducts(cid)
        cid = cart.product.find(product => product.id === cid)
    }catch (error) {
        console.log(error);
    }
    //con el ID buscar el carrito
    res.status(200).json({
        mensaje: 'Este es el carrito',
        Cart,
    })
})

//POST localhost/api/carts

router.post('/:cid/product/:pid', async (req, res) => {
    const {cid, pid} = req.params
    try {
        const cart = await Cart.uploadtProduct(cid, pid)
        cid = cart.product.find(product => product.id === cid)

        /* cart = {
            id: cid,
            prduct: [{
                id: pid,
                quantity: ''
            }]
        } */
        
        res.status(200).json({
            mensaje: 'Product agregado al carrito',
            
    })
    }  catch (error) {
        console.log(error)
    }
})
module.exports = router