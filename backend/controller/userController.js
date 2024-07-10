const User = require("../models/User") 
const bcrypt = require("bcrypt");
const Joi = require("joi")


const login = async(req,res)=>{
    const LoginSchema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'any.required': 'Email is required',
        'string.email': 'Please enter a valid email',
        'string.empty': 'Email cannot be empty'
      }),
      password: Joi.string().required().messages({
        'any.required': 'Password is required',
        'string.empty': 'Password cannot be empty'
      })
    })
    const {value,error} = LoginSchema.validate(req.body,{abortEarly: false})
   if(error){
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ message: "Validation Error", errors: errorMessages });
     }
   
   const { password, email } = value;
   try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ mesg: "Incorrect email or password" });
      }
      const match = await bcrypt.compare(password, user.password);
   
      
      if (match) {
          const token = user.signJWT()
        res.status(200).json({user,token});
      } else {
        res.status(400).json({ message: "Incorrect email or password" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error", error: err.message });
    }
  }




  const signup =async (req,res)=>{

    const SignUpSchema = Joi.object({
      name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name cannot be empty'
      }),
      email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'any.required': 'Email is required',
        'string.email': 'Please enter a valid email',
        'string.empty': 'Email cannot be empty'
      }),
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character"
        )
        .required()
        .messages({
          'any.required': 'Password is required',
          'string.empty': 'Password cannot be empty',
          'string.pattern.base': 'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character'
        }),
      phone: Joi.string()
        .pattern(/^\d{10}$/, "Please enter a valid phone number (10 digits)")
        .required()
        .messages({
          'any.required': 'Phone number is required',
          'string.empty': 'Phone number cannot be empty',
          'string.pattern.base': 'Please enter a valid phone number (10 digits)'
        })
    })
    const {value , error} = SignUpSchema.validate(req.body,{abortEarly:false})
    if(error){
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({ message: "Validation Error", errors: errorMessages });
    }

    const { name, email, password, phone } = value;
    try {
           
      const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
      if (existingUser) {
        const existingFields = [];
        if (existingUser.email === email) existingFields.push('email');
        if (existingUser.phone === phone) existingFields.push('phone');
        return res.status(400).json({ message: `${existingFields.join(' and ')} already exists` });
      }
      
        const user = new User({
          name,
          email,
          password,
          phone,
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
      } catch (err) {
        // console.error(err);
        if (err instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ message: 'Database validation error', errors: err.errors });
        } else {
          return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
      }


  }
  module.exports ={login,signup}