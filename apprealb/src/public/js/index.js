const socket = io()

let user 
let chatBox = document.getElementById('chatBox')


Swal.fire({
    title: 'IDENTIFICATE',
    input: 'text',
    text: 'INGRESAR UN USUARIO',
    icon: 'success',

    inputValidator: value => {
        return !value && 'Necesitas escribir un nombre de usuario'
    },
    allowOutsideClick: false
}).then((result) => {
    user = result.value
    socket.emit('authenticated', user)
})

const handleSocket = (event) => {
    if (event.key === 'Enter'){
        if (chatBox.value. trim().length > 0){
            socket.emit('message', {
                user: user,
                message: chatBox.value
            })
            chatBox.value = ''
        }
    }
}
chatBox.addEventListener('keyup',  handleSocket)

socket.on('messageLog', data => {
    let log = document.getElementById('messageLog')
    let message = ''
    data.forEach((mensajes) => {
        message = message + `<li>${mensajes.user} dice: ${mensajes.message}</li>`

    });
    log.innerHTML = message
})

socket.on('newUserConected', data => {
    console.log(data)
    if(!user) return
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        title: `${data} se ha unido al chat`,
        icon: 'success'
    })
})