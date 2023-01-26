app.use(express.json())

app.get('/api/usuarios', (req, res) => {
    res.status(200).send(arraydeUsuarios)
})

app.post('/api/usuarios', (req, res) => {

    let user = req.body

    if (!user.nombre || !user.apellido){
        return res.status(404).send({mensaje: 'pasar bien usuarios'})
    }

    console.log(user)
    arraydeUsuarios.push(user)
    res.status(201).send({
        user,
        message: 'se creo'
    })
})

app.delete('/api/usuarios/:userId', (req, res) => {

    const {userId} = req.params
    let arrayTamano = arraydeUsuarios.length
    let users = arraydeUsuarios.filter(user => user.id !== userId)
    
    res.status(200).send({mensaje: 'usuario borrado'}, users)
})

