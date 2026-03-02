const { Router } = require("express")
const authController = require("../controllers/auth.controller")


const router = Router()


/**
 * @routes /api/auth/register
 * @description register user
 */
router.post("/register", authController.registerUser)


/**
 * @routes /api/auth/login
 * @description login user
 */
router.post("/login", authController.loginUser)


module.exports = router