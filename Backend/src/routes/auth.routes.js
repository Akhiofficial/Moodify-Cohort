const { Router } = require("express")
const authController = require("../controllers/auth.controller")
const authMiddlewear = require("../middlewears/auth.middlewear")

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


/**
 * @route /api/auth/get-me
 * @description get current user
 */
router.get("/get-me", authMiddlewear.authUser, authController.getMe)


/**
 * @route /api/auth/logout
 * @description logout user
 */
router.get("/logout", authController.logoutUser)


module.exports = router