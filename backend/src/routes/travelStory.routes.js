import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addTravelStory, getAllTravelStories, imageUpload } from "../controllers/travelStory.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import fs from "fs"

const router = Router()

router.route("/add").post(verifyJWT, addTravelStory)
router.route("/").get(verifyJWT, getAllTravelStories)
router.route("/image-upload").post(upload.single("image"), imageUpload)


export default router