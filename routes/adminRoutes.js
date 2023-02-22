const router = require('express').Router()

const adminController = require('../controllers/adminController')

router.get('/test', adminController.test)

module.exports = router