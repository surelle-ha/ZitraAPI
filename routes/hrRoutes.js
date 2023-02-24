const router = require('express').Router()

const hrController = require('../controllers/hrController')

router.get('/', hrController.test)
router.get('/test', hrController.test)
router.get('/createHiring', hrController.createHiring)
router.get('/removeHiring', hrController.removeHiring)

module.exports = router