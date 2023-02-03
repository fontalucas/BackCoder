const express = require('express')

const { Router } = express

const router = Router()


const fakeApi = [
    {name: 'producto 1', price: 120},
    {name: 'producto 1', price: 120},
    {name: 'producto 1', price: 120}
]

router.get('/', (req, res) => {
    let testUser = {
        name: 'lucas',
        lastName: 'fonta',
        role: 'user',
    }
    res.render('index', {
        user: testUser,
        isAdmin: testUser.role==='admin',
        fakeApi,
        style: 'index.css'
    })
})

router.get('/register', (req, res) => {
    res.render('register')
})
module.exports = router