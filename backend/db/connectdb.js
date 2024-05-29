const mongoose =require("mongoose")

const connectdb =async ()=>{

    try {
    return mongoose.connect(process.env.MONGOOSE_CONECT)
    .then(()=>console.log("Connect Data Base".green.bold))
    .catch((err)=>console.log(`ERROR TO CONNECT DB : ${err}`))
    
    }
    catch (error) {
        console.log("err db");
    }


}
module.exports =connectdb
