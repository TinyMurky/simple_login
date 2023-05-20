import express from "express"
import { User } from "../../models/user.js"
import { ROOT } from "../../app.js"
import { nanoid } from "nanoid"
const router = express.Router()
const oneDay = 86400000
const setting = {
  index: {
    stylesheet: "/stylesheets/index.css",
    javascript: "/javascripts/index.js",
    title: "Welcome",
    name: null,
  },
  register: {
    stylesheet: "/stylesheets/form.css",
    javascript: "/javascripts/form.js",
    title: "Register",
  },
  login: {
    stylesheet: "/stylesheets/form.css",
    javascript: "/javascripts/form.js",
    title: "Login",
  },
}
router.get("/", async (req, res) => {
  //if session direct to login
  if (req.signedCookies && req.signedCookies.login_passport) {
    const loginPassport = req.signedCookies.login_passport
    const sessionUser = await User.findOne({
      sessionID: loginPassport,
    }).exec()
    if (sessionUser && sessionUser.updatedAt - Date.now() < oneDay) {
      setting.index.name = sessionUser.firstName
      return res.render("index", setting.index)
    }
  }
  return res.redirect(303, "/login")
})

router.get("/register", (req, res) => {
  res.render("register", setting.register)
})
router.get("/login", async (req, res) => {
  //if session direct to login
  if (req.signedCookies && req.signedCookies.login_passport) {
    const loginPassport = req.signedCookies.login_passport
    const sessionUser = await User.findOne({
      sessionID: loginPassport,
    }).exec()
    if (sessionUser && sessionUser.updatedAt - Date.now() < oneDay) {
      setting.index.name = sessionUser.firstName
      return res.redirect(303, "/")
    }
  }
  //if fail session check
  return res.render("login", setting.login)
})

router.post("/register", (req, res) => {
  console.log(req.body)
  res.send({ alert: "happy day" })
})
router.post("/login", async (req, res) => {
  try {
    //login
    const loginData = req.body
    const loginUser = await User.findOne({ email: loginData.email }).exec()
    if (loginUser && loginUser.password === loginData.password) {
      //cookie code
      const sessionID = nanoid()
      loginUser.sessionID = sessionID
      loginUser.save()
      res.cookie("login_passport", sessionID, {
        expires: new Date(Date.now() + oneDay),
        signed: true,
      })
      //Fetch 一定要用 status 3xx才可以redirect
      //https://stackoverflow.com/questions/39735496/redirect-after-a-fetch-post-call
      setting.index.name = loginUser.firstName
      return res.redirect(303, "/")
    } else {
      return res.send({ alert: "Email or Password Incorrect" })
    }
    console.log(req.body)
  } catch (error) {
    res.send({ alert: error.message })
  }
})

router.post("/logout", (req, res) => {
  res.clearCookie("login_passport")
  return res.redirect(303, "/login")
})
export { router }
