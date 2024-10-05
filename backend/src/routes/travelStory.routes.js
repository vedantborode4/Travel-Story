import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { 
    addTravelStory,
    deleteTravelStory,
    editTravelStory,
    getAllTravelStories,
    imageUpload
} from "../controllers/travelStory.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route("/add").post(verifyJWT, addTravelStory)
router.route("/").get(verifyJWT, getAllTravelStories)
router.route("/image-upload").post(upload.single("image"), imageUpload)
router.route("/edit/:id").post(verifyJWT, editTravelStory)
router.route("/delete").post(verifyJWT, deleteTravelStoryTravelStory)

export default router