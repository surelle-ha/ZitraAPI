const router = require("express").Router();
const userController = require("../controllers/User");

router.post('/v1/core/user/test', userController.test)
router.get('/v1/core/user/create', userController.CreateUser) //change to post later & update controller
router.get('/v1/core/user/register', userController.AddUser)
router.post('/v1/core/user/authenticate', userController.AuthUser)
router.get('/v1/core/user/logout', userController.LogoutUser)

module.exports = router;
