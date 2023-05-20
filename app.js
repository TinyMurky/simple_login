import express from "express"
import exphds from "express-handlebars"
import { db } from "./configs/mongoose.js"
import { router as routes } from "./routes/index.js"
import cookieParser from "cookie-parser"
const app = express()
const PORT = process.env.PORT || 3000
const secretWord = "Kyaru"
export const ROOT = process.env.HOST || `localhost:${PORT}`
app.engine("handlebars", exphds.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(secretWord))
app.use(routes)
app.listen(PORT, () => {
  console.log(`Server: ${ROOT} started`)
})
