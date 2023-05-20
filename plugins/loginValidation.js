import { User } from "../models/user.js"
import { nanoid } from "nanoid"
export async function checkIsLogin(req, setting, expireTime) {
  if (req.signedCookies && req.signedCookies.login_passport) {
    const loginPassport = req.signedCookies.login_passport
    const sessionUser = await User.findOne({
      sessionID: loginPassport,
    }).exec()
    if (sessionUser && sessionUser.updatedAt - Date.now() < expireTime) {
      setting.index.name = sessionUser.firstName
      return true
    }
  }
  return false
}

export async function loginValidate(req, res, setting, expireTime) {
  try {
    const loginData = req.body
    const loginUser = await User.findOne({ email: loginData.email }).exec()
    if (loginUser && loginUser.password === loginData.password) {
      //cookie code
      const sessionID = nanoid()
      loginUser.sessionID = sessionID
      loginUser.save()
      res.cookie("login_passport", sessionID, {
        expires: new Date(Date.now() + expireTime),
        signed: true,
      })
      //Fetch 一定要用 status 3xx才可以redirect
      //https://stackoverflow.com/questions/39735496/redirect-after-a-fetch-post-call
      setting.index.name = loginUser.firstName
      return true
    } else {
      return false
    }
  } catch (error) {
    throw Error(error)
  }
}
