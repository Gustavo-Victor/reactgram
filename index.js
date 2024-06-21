// modules
import express from "express";
import { config } from "dotenv";
import path, { dirname } from "node:path";
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
const baseDir = `${__dirname}/client/dist/`; 


// middlewares
// app.use(cors({credentials: true, origin: frontEndHost})); 
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, "client/dist")));
app.use("/", Router);


app.get("*", (req, res) => {
    res.sendFile("index.html", { root: baseDir }); 
});


// port config 
app.listen(port || 4000, () => {
    console.log(`App is running on port: ${port}`);
});  