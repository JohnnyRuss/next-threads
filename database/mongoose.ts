import mongoose from "mongoose";
import { DB_APP_CONNECTION } from "@/config/env";

let isConnected = false;

export default async function ConnectToDB() {
  mongoose.set("strictQuery", true);

  if (!DB_APP_CONNECTION) return console.log("mongoDB URL not found !!!");
  else if (isConnected) return console.log("DB is already connected");

  try {
    mongoose.connect(DB_APP_CONNECTION);
    isConnected = true;

    console.log("Connected to DB");
  } catch (error) {
    console.log("Ocurred ERROR during DB_Connection");
  }
}
