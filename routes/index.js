import express from "express"
import { router as home } from "./modules/home.js"
const router = express.Router()
router.use("/", home)
export { router }
