import { Router } from "express";
import { authenticateToken, verifyJWT } from "../middleware/auth.middleware.js";
import { 
    registerUser,
    loginUser,
    logoutUser,
    getUser
} from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/get-user").get(authenticateToken, getUser)
router.route("/logout").post(verifyJWT, logoutUser)

export default router