// class TicketManager {
//     #precioBaseGanancia = 0.15
//     constructor() {
//         this.eventos = []
//     }
// 
//     getEventos = () => this.eventos
//     agregarEvento = (nombre, lugar, precio, capacidad*50, fecha= Date()) => {
//         const evento = {
//             nombre,
//             lugar,
//             precio: precio*this.#precioBaseGanancia,
//             capacidad,
//             fecha
//         }
//         if (this.eventos.length === 0){
//             this.evento.id = 1
//         } else {
//             evento.id = this.eventos[this.eventos.length - 1].id + 1
//         }
//         //[evento, ...this.eventos] } // o tambien puede ser this.eventos.push(evento)
//         this.eventos.push(evento)
//     }
// const ticketManager = new TicketManager()
// ticketManager.agregarEvento({'fede' 'lugar' 12931})
// ticketManager.agregarEvento({nombre: 'evento 2', precio: 123123})
// ticketManager.agregarEvento({nombre: 'evento 3'})

const fs = require('fs');

module.export = class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        
    }
    addProduct = (newProduct) => {
        
        let productDb = this.getProducts()
        let data = productDb.find(product => product.code === newProduct.code)
        
        if (newProduct.title === '' || newProduct.description === '' || newProduct.price === '') {
            return 'Llenar bien los campos'
        }
        if (data) {
            return 'Se encuentra el producto'
        } 
        if (productDb.length === 0) {
            newProduct.id = 1
            productDb.push(newProduct)
        } else {
            productDb = [... productDb, {... newProduct, id: productDb[productDb.length - 1].id + 1}]
        }
        fs.writeFileSync(this.path, JSON.stringify(productDb, null, '\n'), (err) => {
            if (!err) {
            console.log('Producto agregado');
            }
            else {
                console.log(err)
            }
        })
    }
    getProducts = () => {
        if (fs.existsSync(this.path)) {
            let data = fs.readFileSync(this.path, 'utf-8',)
            let productDb= JSON.parse(data);
                return productDb
            }
        else {
            fs.writeFileSync(this.path, '[]', 'utf-8', (err) => {
                if (!err){ 
                    return [] 
                }
                else {
                    console.log(err)
                }
            })
        }
    }
        
    
    getProductById = (id) => {
        let data = fs.readFileSync(this.path, 'utf-8', (err) => {
        let productDb = JSON.parse(data).find(product => product.id === id)
            console.log(err)
            if (!productDb) {
                console.log('Not Found')
            }
            return productDb
        })
    }

    updateProduct = (id, obj) => {
        let data = fs.readFileSync(this.path, 'utf-8')
        let productDb = JSON.parse(data)
        let updateItem = productDb.find(product => product.id === id)
        if ( updateItem === -1) {
            return console.log(`No existe producto con el id: ${id}`)
        }
        updateItem = obj
        obj.id = id
        //productDb[index] = { ...campoActualizar, id: products[index].id }

        fs.writeFileSync(this.path, JSON.stringify(productDb, null,'\n'))
        console.log('Producto actualizado en la base de datos');
    }

    deleteProduct = (id) => {
        let data = fs.readFileSync(this.path, 'utf-8')
        let productDb = JSON.parse(data)
        const index = productDb.findIndex(product => product.id === id)
        if (index === -1) {
            return console.log(`No existe producto con el id: ${id}`)
        }
        productDb.splice(index, 1)
        fs.writeFileSync(this.path, JSON.stringify(productDb, null,'\n'))
        console.log('Producto eliminado de la base de datos');
    }

}




/* console.log(products.addProduct({
        title: "Celu", 
        description: "computadora", 
        price: 20, 
        thumbnail: "jkk", 
        code: 2,
        stock: 13  })) */

/* console.log(products.getProducts())
console.log(products.getProductById(2)) */
    
