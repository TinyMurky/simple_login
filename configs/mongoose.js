import mongoose from "mongoose"
import dotenv from "dotenv"

if (process.env.NODE_ENV !== "Production") {
  dotenv.config({ path: ".env" })
}
mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on("error", (error) => {
  console.error("[Mongoose link error]: ", error.message)
})

db.once("open", () => {
  console.log("Mongoose Link correctly")
})

export { db }
