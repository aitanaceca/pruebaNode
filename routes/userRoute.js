const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');

router.get("/signup", UserController.user_signup_form);
router.post("/signup", UserController.user_signup);

module.exports = router;