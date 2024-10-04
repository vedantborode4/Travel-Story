import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addTravelStory, getAllTravelStories } from "../controllers/travelStory.controller.js";

const router = Router()

router.route("/add").post(verifyJWT, addTravelStory)
router.route("/").get(verifyJWT, getAllTravelStories)


export default router