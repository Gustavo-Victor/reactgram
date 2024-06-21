// modules
import express from "express";
import { config } from "dotenv";
import path from "node:path"; 
import url from "node:url"; 
import cors from "cors";
import Router from "./routes/Router.js"; 
import "./config/db.js"; 


// dotenv config
config();


// express config 
const app = express();


// environment variables
const { PORT: port } = process.env;


// front-end host
const frontEndHost = "https://reactgram-alpha.vercel.app/"; 


// dirname
const __dirname = url.fileURLToPath(new URL(".", import.meta.url)); 


// middlewares
app.use(cors({credentials: true, origin: frontEndHost})); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); 
app.use("/", Router);


// port config 
app.listen(port || 4000, () => {
    console.log(`App is running on port: ${port}`);
});  