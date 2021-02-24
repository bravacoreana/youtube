import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

const handleSuccess = () => console.log("🟢 Connected to DB!");
const handleError = (error) =>
  console.log(`🔴 DB Connection Error at: ${error}`);

db.once("open", handleSuccess);
db.on("error", handleError);
