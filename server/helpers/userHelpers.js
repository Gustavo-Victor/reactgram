import { config } from "dotenv"; 
import jwt from "jsonwebtoken"; 
config();


const { SECRET } = process.env; 


export function generateToken(id) {
    return jwt.sign({id}, SECRET, {expiresIn: "7d"}); 
}
