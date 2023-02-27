const router = require('express').Router()

const recruitmentController = require('../controllers/Recruitment')

router.get('/v1/core/recruitment/', recruitmentController.test)
router.get('/v1/core/recruitment/test', recruitmentController.test)
router.get('/v1/core/recruitment/create', recruitmentController.createHiring)
router.delete('/v1/core/recruitment/remove', recruitmentController.removeHiring)

module.exports = router