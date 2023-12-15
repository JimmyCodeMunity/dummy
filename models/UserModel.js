const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter your shop name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your shop email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password should be greater than 6 characters"],
      select: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      enum: ["Not approved", "Approved","On Hold", "Rejected"],
      default: "Not approved",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
     resetPasswordToken: String,
     resetPasswordTime: Date,
    });
    
    
    //  Hash password
    userSchema.pre("save", async function (next){
      if(!this.isModified("password")){
        next();
      }
    
      this.password = await bcrypt.hash(this.password, 10);
    });
    
    // jwt token
    // userSchema.methods.getJwtToken = function () {
    //   return jwt.sign({ id: this._id}, JWT_SECRET_KEY,{
    //     expiresIn: process.env.JWT_EXPIRES,
    //   });
    // };
    
    // compare password
    userSchema.methods.comparePassword = async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };
    
    const User = mongoose.model('User', userSchema);

    module.exports = User;