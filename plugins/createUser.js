import { User } from "../models/user.js"

export async function createUser(req) {
  const newUser = {
    firstName: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }
  return await User.create(newUser)
}
