import { Router } from "express";
import { validate } from "../middlewares/handleValidation.js";
import { checkAuth } from "../middlewares/authGuard.js";
import { uploadConfig } from "../middlewares/imageUpload.js"
import {
    createUser,
    readUserById, 
    login,
    readCurrentUser,
    updateUser, 
    readUsers,
    deleteUser, 
} from "../controllers/UserController.js";
import {
    userCreateValidation,
    userLoginValidation,
    userUpdateValidation
} from "../middlewares/userValidation.js";


const userRouter = Router();


userRouter.post("/register", userCreateValidation(), validate, createUser);
userRouter.post("/login", userLoginValidation(), validate, login);
userRouter.put("/", checkAuth, userUpdateValidation(), validate, uploadConfig.single("profileImage"), updateUser)
userRouter.get("/profile", checkAuth, readCurrentUser);
userRouter.get("/:id", readUserById); 
userRouter.get("/", checkAuth, readUsers); 
userRouter.delete("/:id", checkAuth, deleteUser); 
 
export default userRouter;



