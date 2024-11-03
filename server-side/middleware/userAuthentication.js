const jwt =require("jsonwebtoken");
const userSecretId=require("../configs/dotenv.config")
const userAuthentication=async(req,res,next)=>{
    // console.log("hello authentication")
    console.log("cookie",req.cookies)
   const userToken= req.cookies.userToken
   if(!userToken){
    return res.status(404).json({status:"not found",message:"user token not found"})
   }
   jwt.verify(userToken,userSecretId,(error,user)=>{
    console.log("verify",user);
    
   })
    next()
}

module.exports={userAuthentication}