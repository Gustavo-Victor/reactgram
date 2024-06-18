import { Router } from "express";
import { photoCreateValidation, photoUpdateValidation, createCommentValidation } from "../middlewares/photoValidation.js"
import { checkAuth } from "../middlewares/authGuard.js";
import { validate } from "../middlewares/handleValidation.js"
import { uploadConfig } from "../middlewares/imageUpload.js"
import { 
    createPhotoComment,
    createPhoto,
    deletePhoto,
    likePhoto,
    readPhotoById,
    readPhotos,
    readUserPhotos,
    updatePhoto,
    searchPhotos, 
    deletePhotoComment,
    // dislikePhoto, 
} from "../controllers/PhotoController.js"; 


const photoRouter = Router();


photoRouter.post("/", checkAuth, uploadConfig.single("src"), photoCreateValidation(), validate, createPhoto);
photoRouter.delete("/:id", checkAuth, deletePhoto); 
photoRouter.get("/", readPhotos); 
photoRouter.get("/search", checkAuth, searchPhotos); 
// photoRouter.get("/user/:id", checkAuth, readUserPhotos); 
photoRouter.get("/user/:id", readUserPhotos); 
photoRouter.get("/:id", checkAuth, readPhotoById); 
photoRouter.put("/:id", checkAuth, photoUpdateValidation(), validate, updatePhoto); 
photoRouter.put("/like/:id", checkAuth, likePhoto); 
// photoRouter.put("/dislike/:id", checkAuth, dislikePhoto); 
photoRouter.put("/comment/:id", checkAuth, createCommentValidation(), validate, createPhotoComment); 
photoRouter.delete("/:id/:comment_id", checkAuth, deletePhotoComment); 

export default photoRouter; 