import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") ){
        cb(null, true);
    }else {
        cb(new Error ("Only images are allowed"), false)
    }
}
  
export const upload = multer({
    storage, fileFilter
})