const express = require('express')
const path = require('path')
const auth = require('./api/auth')
const basicAuth = require('express-basic-auth')

const app = express()
const router = express.Router()

const API_VERSION = 'v1'

// setup auth

const staticAuth = basicAuth({
	users: { admin: 'p455' },
})

// page endpoints
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/containers/index/index.html'))
})

router.get('/dashboard', (req, res) => {
	res.sendFile(path.join(__dirname, '/containers/main/index.html'))
})

// api

router.post(`/api/${API_VERSION}/auth/processLogin`, staticAuth, auth.processLogin)

app.use('/js', express.static(path.join(__dirname, 'public/js')))
app.use('/css', express.static(path.join(__dirname, 'public/css')))
app.use('/img', express.static(path.join(__dirname, 'public/img')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/', router)
module.exports = router

app.listen(8008)
