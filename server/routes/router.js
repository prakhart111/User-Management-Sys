const express = require('express')
const router = express.Router()

const services = require('../services/render')
const controller = require('../controler/controller')

//details of route function in services/router.js 
router.get('/',services.homeRoute)

router.get('/add-user',services.addUserRoute) 

router.get('/update-user',services.updateUserRoute)


// API
router.post('/api/users',controller.create)
// that controller function is called 
// when POST request is made to that URL

router.get('/api/users',controller.find)

router.put('/api/users/:id',controller.update)

router.delete('/api/users/:id',controller.delete)


module.exports = router;