const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('./dashboard/index.ejs', { layout: './main.ejs' })
})
router.get('/login', (req, res) => {
    res.render('./authorization/login.ejs', { layout: './main.ejs' })
})
router.get('/register', (req, res) => {
    res.render('./authorization/register.ejs', { layout: './main.ejs' })
})
router.get('/profile', (req, res) => {
    res.render('./authorization/profile.ejs', { layout: './main.ejs' })
})
router.get('/message', (req, res) => {
    res.render('./message/index.ejs', { layout: './main.ejs' })
})



module.exports = router