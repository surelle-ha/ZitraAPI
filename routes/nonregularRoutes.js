const router = require('express').Router()

const nonregularController = require('../controllers/nonregularController')

router.post('/test', nonregularController.test)
router.post('/addAnnouncement', nonregularController.addAnnouncement)
router.get('/removeAnnouncement', nonregularController.removeAnnouncement)

module.exports = router