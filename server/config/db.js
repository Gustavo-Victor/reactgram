import mongoose from "mongoose";
import { config } from "dotenv";
config(); 

const { DB_URI } = process.env;


async function main() {
    try {
        await mongoose.connect(`${DB_URI}`); 
        console.log(`Succesfully connected.`);
    } catch(e) {
        console.log(e); 
        console.log(`Connection failure. `); 
    }
}


main();
