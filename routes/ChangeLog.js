const router = require('express').Router()

const changelogController = require('../controllers/ChangeLog')

router.post('/v1/core/changelog/', changelogController.test)
router.post('/v1/core/changelog/test', changelogController.test)
router.post('/v1/core/changelog/add', changelogController.addChangeLog)
router.delete('/v1/core/changelog/remove', changelogController.removeChangeLog)

module.exports = router