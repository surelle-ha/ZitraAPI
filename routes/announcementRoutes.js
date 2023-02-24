const router = require('express').Router()

const announcementController = require('../controllers/announcementController')

router.post('/test', announcementController.test)
router.post('/addAnnouncement', announcementController.addAnnouncement)
router.get('/removeAnnouncement', announcementController.removeAnnouncement)
router.get('/acknowledgeAnnouncement', announcementController.acknowledgeAnnouncement)

module.exports = router