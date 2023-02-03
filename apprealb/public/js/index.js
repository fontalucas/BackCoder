console.log("Hola")
const socket = io()

socket.emit("mensaje", 'Hola este es un mensaje del cliente')

