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



class ProductManager {
    constructor() {
        this.products = []
    }
    getProducts = () => this.products
    
    getProductById = (id) => {
        const productDb = this.products.find(product => product.id === id)
        if (!productDb) {
            console.log('Not Found')
        }
        return productDb
    }

    addProduct = (newProduct) => {
        const productDb = this.products.find(product => product.code === newProduct.code)
        if (productDb) {
            return 'Se encuentra el producto'
        } 
        if (newProduct.title === '' && newProduct.description === '' && newProduct.price === '') {
            return 'Llenar bien los campos'
        }
        if (this.products.length === 0) {
            newProduct.id = 1
            this.products.push(newProduct)
        } else {
            this.products = [... this.products, {... newProduct, id: this.products[this.products.length - 1].id + 1}]
        }
    }
    
        
}

const productos = new ProductManager() 

console.log(productos.addProduct({
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

    console.log(productos.getProducts())
    console.log(productos.getProductById(2))
