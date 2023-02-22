const router = require('express').Router()

const regularController = require('../controllers/regularController')

router.get('/test', regularController.test)
router.get('/acknowledgeAnnouncement', regularController.acknowledgeAnnouncement)

module.exports = router