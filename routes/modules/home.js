import express from "express"
import { User } from "../../models/user.js"
import { ROOT } from "../../app.js"
import { checkIsLogin, loginValidate } from "../../plugins/loginValidation.js"
import { createUser } from "../../plugins/createUser.js"
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
  const isLogin = await checkIsLogin(req, setting, oneDay)
  if (isLogin) {
    return res.render("index", setting.index)
  } else {
    return res.redirect(303, "/login")
  }
})

router.get("/register", (req, res) => {
  res.render("register", setting.register)
})
router.get("/login", async (req, res) => {
  //if session direct to login
  const isLogin = await checkIsLogin(req, setting, oneDay)
  if (isLogin) {
    return res.redirect(303, "/")
  } else {
    return res.render("login", setting.login)
  }
})

router.post("/register", async (req, res) => {
  try {
    res.clearCookie("login_passport")
    await createUser(req)
    return res.redirect(303, "/login")
  } catch (error) {
    return res.send(error.message)
  }
})
router.post("/login", async (req, res) => {
  try {
    //login
    const passLoginValid = await loginValidate(req, res, setting, oneDay)
    if (passLoginValid) {
      return res.redirect(303, "/")
    } else {
      return res.send({ alert: "Email or Password Incorrect" })
    }
  } catch (error) {
    res.send({ alert: error.message })
  }
})

router.post("/logout", (req, res) => {
  res.clearCookie("login_passport")
  return res.redirect(303, "/login")
})
export { router }
