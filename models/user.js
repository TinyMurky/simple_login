import mongoose from "mongoose"
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "your name is needed"],
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /\w+@\w+/.test(v)
        },
        message: (props) => {
          return `${props} is not valid email`
        },
      },
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    sessionID: {
      type: String,
    },
  },
  { timestamps: true }
)
const User = mongoose.model("Users", userSchema)
export { User }
