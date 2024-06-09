import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../models/User.js"; 
config();

const { SECRET } = process.env; 



export async function checkAuth(req, res, next) {
    const authorization = req.headers["authorization"]; 
    const token = authorization && authorization.split(" ")[1]; 

    if(!token || !authorization) {
        res.status(401).json({errors: ["Access denied"]}); 
        return ; 
    }

    try {
        const verifiedToken = jwt.verify(token, SECRET);
        req.user = await User.findById(verifiedToken.id).select("-password");
        next();  
    } catch(e) {
        res.status(401).json({errors: ["User token is invalid"]}); 
    }
}