const fs = require('fs');


const path = './src/mockDB/cart.json';

module.export = class CartManager {
    constructor() {
        this.path = path
    }
    createCart = () => {
        
        let cart = this.getCartProducts()
        
        if (fs.existsSync(this.path, 'utf-8')) {
            cart.id = 1
            cart.product = []
            productDb.push(cart)
        } else {
            fs.writeFileSync(this.path, JSON.stringify(productDb, null, '\n'), (err) => {
                if (!err) {
                    console.log('Carrito creado');
                }
                else {
                    console.log(err)
                }
            })
        }
    }
    getCartProducts = () => {
        if (fs.existsSync(this.path)) {
            let data = fs.readFileSync(this.path, 'utf-8',)
            let productDb= JSON.parse(data);
            let cart = productDb

            return cart.product
            }
        else {
            fs.writeFileSync(this.path, '{}', 'utf-8', (err) => {
                if (!err){ 
                    return {} 
                }
                else {
                    console.log(err)
                }
            })
        }
    }



    uploadProduct = (cid, pid) => {
        let data = fs.readFileSync(this.path, 'utf-8')
        let productDb = JSON.parse(data)
        let cart = productDb[cid - 1]
        const index = productDb.findIndex(product => product.id === pid)
        if (index === -1) {
            return console.log(`No existe producto con el id: ${id}`)
        }else {
            let product = {}
            product.id = pid
            cart.products = [...cart.products, product]
        //productDb[index] = { ...campoActualizar, id: products[index].id }

        fs.writeFileSync(this.path, JSON.stringify(productDb, null,'\n'))
        console.log('Producto actualizado en la base de datos');
        }
    }

}