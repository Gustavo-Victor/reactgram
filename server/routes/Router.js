import { Router } from "express";
import userRouter from "./userRoutes.js";
import photoRouter from "./photoRoutes.js";


const appRouter = Router();


appRouter.use("/api/users", userRouter);
appRouter.use("/api/photos", photoRouter); 

appRouter.get("/", (req, res) => {
    res.json({ message: "Home" });
}); 


export default appRouter; 