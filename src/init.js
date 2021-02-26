import "@babel/polyfill";
import "./db";
import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`🟢 Listening at: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
