const router = require("express").Router();
const userController = require("../controllers/userController");

router.get('/create', userController.CreateUser) //change to post later & update controller
router.get('/register', userController.AddUser)
router.post('/authenticate', userController.AuthUser)
router.get('/logout', userController.LogoutUser)

module.exports = router;
