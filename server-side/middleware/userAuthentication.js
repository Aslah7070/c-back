const jwt =require("jsonwebtoken");
const {userSecretId}=require("../configs/dotenv.config")
const userAuthentication=async(req,res,next)=>{
    try {
        // console.log("hello authentication")
    // console.log("cookie",req.cookies)
    const userToken= req.cookies.userToken
    if(!userToken){
     return res.status(404).json({status:"not found",message:"user token not found"})
    }
    jwt.verify(userToken,userSecretId,(error,user)=>{
        // console.log("error",error.name);
      
        
        if(error){
            if(error.name==="TokenExpiredError"){
                return res.status(401).json({status:"failed",message:"validation Errot:TokenExpired ",expiredAt: error.expiredAt})
            }
            return res.status(401).json({status:"failed",message:"validation Errot  "})
        }
     req.user=user
     console.log("uu",user);
     

     next()
    })
     
    } catch (error) {
        res.status(400).json({status:"validation error",message:error})
    }
}

module.exports={userAuthentication}