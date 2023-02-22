const router = require("express").Router()

const navController = require("../controllers/navController");

// Authentication Pages
router.get("/login", navController.login);
router.get("/signin", navController.login);
// General Pages
router.get("/", navController.home_redirect);
router.get("/home", navController.home);
router.get("/index", navController.home_redirect);
router.get("/dashboard", navController.dashboard);
router.get("/account", navController.account);
// Administrator Pages
router.get('/employee-manager', navController.employeemanager)
// Developer Pages
router.get("/general", navController.devGeneral);
router.get("/console", navController.devConsole);

module.exports = router;