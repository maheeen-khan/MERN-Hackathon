import mongoose from "mongoose";
import 'dotenv/config';

const db = 'classroom';
const url = `${process.env.MONGODB_URL}/${db}`

const connectToDB=async()=>{
    mongoose.connection.on("open", () => {
      console.log("MongoDB connected");
    });
    mongoose.connection.on("error", () => {
      console.error("Error in connecting MongoDB");
    });
}

mongoose.connect(url)
export default connectToDB;