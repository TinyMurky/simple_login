import mongoose from "mongoose"
import { db } from "../../configs/mongoose.js"
import { User } from "../user.js"
import userList from "./users.json" assert { type: "json" }
db.on("open", async () => {
  try {
    await User.insertMany(userList)
  } catch (error) {
    console.error("[Seed construct error]: ", error)
  }
  console.log("Seeds insert complete")
  return mongoose.disconnect()
})
