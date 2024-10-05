import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { 
    addTravelStory,
    deleteTravelStory,
    editTravelStory,
    filterTravelStory,
    getAllTravelStories,
    imageUpload,
    searchTravelStory,
    updateIsFavourite
} from "../controllers/travelStory.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route("/add").post(verifyJWT, addTravelStory)
router.route("/").get(verifyJWT, getAllTravelStories)
router.route("/image-upload").post(upload.single("image"), imageUpload)
router.route("/edit/:id").put(verifyJWT, editTravelStory)
router.route("/delete").delete(verifyJWT, deleteTravelStory)
router.route("/update-is-favourite/:id").put(verifyJWT, updateIsFavourite)
router.route("/search").get(verifyJWT, searchTravelStory)
router.route("/filter").get(verifyJWT, filterTravelStory)


export default router