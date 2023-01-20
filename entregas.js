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

class ProductManager {
    constructor() {
        this.products = []
        this.path = this.path
        path = './products.json'
    }
    addProduct = (newProduct) => {
        const productDb = this.products.find(product => product.code === newProduct.code)
        if (productDb) {
            return 'Se encuentra el producto'
        } 
        if (newProduct.title === '' || newProduct.description === '' || newProduct.price === '') {
            return 'Llenar bien los campos'
        }
        if (this.products.length === 0) {
            newProduct.id = 1
            this.products.push(newProduct)
        } else {
            this.products = [... this.products, {... newProduct, id: this.products[this.products.length - 1].id + 1}]
        }
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\n'), (err) => {
            if (!err) {
            console.log('Producto agregado');
            }
            else {
                console.log(err)
            }
        })
    }
    getProducts = () => {
        fs.writeFile(this.path, [], 'utf-8', (err) => {
            if (fs.existsSync(this.path)) {
                const productDb = fs.readFile(this.path, 'utf-8')
                this.products = JSON.parse(productDb);
                return this.products
            }
            else {
                console.log(err)
            }
        })
    }
        
    
    getProductById = (id) => {
        const productDb = fs.readFile(this.path, 'utf-8')
        this.products.find(product => product.id === id)
        if (!productDb) {
            console.log('Not Found')
        }
        return productDb
    }

    updateProduct = (id, campoActualizar) => {
        const productDb = fs.readFileSync(this.path, 'utf-8')
        this.products = JSON.parse(productDb)

        const index = this.products.findIndex(product => product.id === id)
        if (index === -1) {
            return console.log(`No existe producto con el id: ${id}`)
        }

        this.products[index] = { ...campoActualizar, id: this.products[index].id }

        fs.writeFileSync(this.path, JSON.stringify(this.products, null,'\n'))
        console.log('Producto actualizado en la base de datos');
    }

    deleteProduct = (id) => {
        const productDb = fs.readFileSync(this.path, 'utf-8')
        this.products = JSON.parse(productDb)
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1) {
            return console.log(`No existe producto con el id: ${id}`)
        }
        this.products.splice(index, 1)
        fs.writeFile(this.path, JSON.stringify(this.products, null,'\n'))
        console.log('Producto eliminado de la base de datos');
    }

    
        
}

const productos = new ProductManager() 

/* console.log(productos.addProduct({
    title: "Nombre del", 
    description: "telefono", 
    price: 20, 
    thumbnail: "jkk", 
    code: 1,
    stock: 13  }))

    console.log(productos.addProduct({
        title: "", 
        description: "computadora", 
        price: 20, 
        thumbnail: "jkk", 
        code: 2,
        stock: 13  }))
 */
    console.log(productos.getProducts())
    console.log(productos.getProductById(2))
    productos.addProduct({
            title: 'producto 3',
            description: 'esto es un producto',
            price: 2500,
            thumbnail: 'ruta imagen',
            code: 2,
            stock: 100
        })
