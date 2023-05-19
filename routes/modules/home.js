import express from "express"
import { User } from "../../models/user.js"
const router = express.Router()
const setting = {
  index: {
    stylesheet: "/stylesheets/index.css",
    javascript: "/javascripts/index.js",
  },
  register: {
    stylesheet: "/stylesheets/form.css",
    javascript: "/javascripts/form.js",
  },
  login: {
    stylesheet: "/stylesheets/form.css",
    javascript: "/javascripts/form.js",
  },
}
router.get("/", (req, res) => {
  res.render("index", setting.index)
})

router.get("/register", (req, res) => {
  res.render("register", setting.register)
})
router.get("/login", (req, res) => {
  res.render("login", setting.login)
})

router.post("/register", (req, res) => {
  console.log(req.body)
  res.send({ alert: "happy day" })
})
router.post("/login", (req, res) => {
  console.log(req.body)
  res.send({ alert: "Sad day" })
})
export { router }
