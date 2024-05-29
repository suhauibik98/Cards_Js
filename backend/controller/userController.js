const User = require("../models/User") 
const bcrypt = require("bcrypt");
const Joi = require("joi")


const login = async(req,res)=>{
    const LoginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    const {value,error} = LoginSchema.validate(req.body,{abortEarly: false})
   if(error){
    return res.status(400).json({mesg:"Error Validation "})
   }
    try {
      const { password, email } = value;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ mesg: "user not found " });
      }
      const match = await bcrypt.compare(password, user.password);
   
      
      if (match) {
          const token = user.signJWT()
        res.status(200).json({user,token});
      } else {
        res.status(400).json({ mesg: "wrong email or password" });
      }
    } catch (err) {
      console.log(err);
    }
  }




  const signup =async (req,res)=>{
    try {
        const { name, email, password, phone } = req.body;
        // const hashValue = await hashPassword(password).then((hashPass) => {
        //   return hashPass;
        // });
    
        if (!name || !email || !password || !phone) {
          return res.status(400).json({ mesg: "please fill all the fields" });
        }
        const user = new User({
          name,
          email,
          password,
          phone,
        });
        await user.save();
        res.status(201).json(user);
      } catch (err) {
        // console.log(err.errorResponse.keyPattern.phone);
        // throw new Error("This user in already exist");
        console.log("This user in already exist");
        return res.status(400).json({ mesg: "This user in already exist",Err:err.errorResponse.keyPattern });
      }


  }
  module.exports ={login,signup}