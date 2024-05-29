const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required:true,
    validate :{
        validator : function(v){
            return /\d{10}/.test(v);
            
            },
            message : "Phone number must be 10 digits"
    }
  },
}, { timestamps: true });


UserSchema.methods.signJWT = function(){
  return jwt.sign({id : this._id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRE})
}




UserSchema.pre("save",async function(){
  if(!this.isModified("password")){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password , salt)
  this.password = hashedPassword

})


const User = mongoose.model("Users", UserSchema);



module.exports = User;
