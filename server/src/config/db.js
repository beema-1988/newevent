require('dotenv').config()
const mongoose=require('mongoose')
const connectDB=async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connection success")

    }
    catch(error){
        console.log("Mongodb Connection error",error)
    }
}


module.exports=connectDB