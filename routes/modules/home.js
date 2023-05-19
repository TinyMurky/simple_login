import express from "express"
import { User } from "../../models/user.js"
const router = express.Router()
const setting = {
  index: {
    stylesheet: "/stylesheets/index.css",
    javascript: "/javascripts/index.js",
    name: null,
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
router.post("/login", async (req, res) => {
  try {
    const loginData = req.body
    const loginUser = await User.findOne({ email: loginData.email }).exec()
    if (loginUser && loginUser.password === loginData.password) {
      setting.index.name = loginUser.firstName
      //Fetch 一定要用 status 3xx才可以redirect
      //https://stackoverflow.com/questions/39735496/redirect-after-a-fetch-post-call
      return res.redirect(303, "/")
    } else {
      return res.send({ alert: "Email or Password Incorrect" })
    }
    console.log(req.body)
  } catch (error) {
    res.send({ alert: error })
  }
})
export { router }
