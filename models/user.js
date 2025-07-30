import mongoose, { model } from "mongoose";
import bcrypt from 'bcryptjs';
// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,'Name is required'],
//     },
//     email:{
//         type:String,
//         required:[true,'email is required'],
//         unique:true,
//         lowercase:true
//     }
// })

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "author", "reader"],
      default: "reader",
    },
  },
  { timestamps: true }
);

// compare password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.passwordHash);
};

const User = model('user',userSchema);
export default User;

