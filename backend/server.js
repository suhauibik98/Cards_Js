const express = require("express");
const app = express();
const cors = require("cors");
const connectdb = require("./db/connectdb");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
require("colors")

// suhaibTest@gmail.com
// Ss@12345

const userRouter = require("./routers/userRouter")
app.use("/api/auth" , userRouter)


const cardsRouter = require("./routers/cardsRouter")
app.use("/api/cards" , cardsRouter)




app.listen(PORT, () => {
  connectdb();
  console.log(`server work >>> PORT:${PORT}`);
});





// app.get("/all-card", async (req,res)=>{
//     try{
//         const all = await CardsInfoModel.find();
//           res.status(200).json(all)
//           // console.log(all);

//     }
//     catch(err){console.log(err)}
    
// })

// app.post("/cardForm" , async (req,res)=>{
  //     try {
  //     const {title , description , phone} = req.body
      
  //     if (!title || !description || !phone) {
  //         return res.status(400).json({ mesg: "please fill all the fields" });
  //       }
  
  // const cardAdd = new CardsInfoModel({title,description,phone})
  // await cardAdd.save()
  // res.status(201).json(cardAdd)
   
  //     }
  //     catch(err){console.log(err)}
  // })




// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;
//     // const hashValue = await hashPassword(password).then((hashPass) => {
//     //   return hashPass;
//     // });

//     if (!name || !email || !password || !phone) {
//       return res.status(400).json({ mesg: "please fill all the fields" });
//     }
//     const user = new User({
//       name,
//       email,
//       password,
//       phone,
//     });
//     await user.save();
//     res.status(201).json(user);
//   } catch (err) {
//     // console.log(err.errorResponse.keyPattern.phone);
//     // throw new Error("This user in already exist");
//     console.log("This user in already exist");
//     return res.status(400).json({ mesg: "This user in already exist",Err:err.errorResponse.keyPattern });
//   }
// });


// app.post("/login", async (req, res) => {
//   try {
//     const { password, email } = req.body;
//     const user = await User.findOne({ email });
// console.log(user);
//     if (!user) {
//       return res.status(400).json({ mesg: "user not found " });
//     }
//     const match = await bcrypt.compare(password, user.password);

//     // if (user.password !== password) {
//     // }
//     //   return res.status(400).json({ mesg: "password is incorrect " });
//     if (match) {
//       res.status(200).json(user);
//     } else {
//       res.status(400).json({ mesg: "wrong email or password" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });