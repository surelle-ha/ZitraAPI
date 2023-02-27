const router = require('express').Router()

const announcementController = require('../controllers/Announcement')

router.post('/v1/core/announcement/', announcementController.test)
router.post('/v1/core/announcement/test', announcementController.test)
router.post('/v1/core/announcement/add', announcementController.addAnnouncement)
router.delete('/v1/core/announcement/remove', announcementController.removeAnnouncement)
router.get('/v1/core/announcement/acknowledge', announcementController.acknowledgeAnnouncement)

module.exports = router