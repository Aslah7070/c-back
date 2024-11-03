const mongoose=require("mongoose")

const {mongoUrl}=require("./dotenv.config")
const connectDB=async()=>{
  try {
    await mongoose.connect(mongoUrl).then(()=>{
        console.log("mongodb connected");
        
    }).catch((error)=>{
        console.log("connceting error",error);
        
    })
  } catch (error) {
    console.log(error);
    
  }
}

module.exports=connectDB
 
