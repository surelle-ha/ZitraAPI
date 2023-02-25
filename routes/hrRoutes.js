const router = require('express').Router()

const hrController = require('../controllers/hrController')

router.get('/v1/internal/hr/', hrController.test)
router.get('/v1/internal/hr/test', hrController.test)
router.get('/v1/internal/hr/createHiring', hrController.createHiring)
router.get('/v1/internal/hr/removeHiring', hrController.removeHiring)

module.exports = router