import multer from "multer"; 
import path from "node:path"; 


const storage = multer.diskStorage({
    destination(req, file, cb) {
        let folder = ""; 

        if(req.baseUrl.includes("users")) {
            folder = "users"; 
        } else if (req.baseUrl.includes("photos")) {
            folder = "photos"; 
        }

        cb(null, `uploads/${folder}/`); 
    }, 
    filename(req, file, cb) {        
        const newFileName =  Date.now() + String(Math.floor(Math.random() * 100) + path.extname(file.originalname)); 
        cb(null, newFileName); 
    }
}); 


export const uploadConfig = multer({
    storage, 
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error("Invalid image format. Only png, jpg and jpeg are accepted.")); 
        }
        cb(null, true); 
    }
});