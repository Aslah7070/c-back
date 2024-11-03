const User=require("../models/userRegistrationSchema")
console.log("rejiste",User);
const {registerJoi}=require("../validations/registerValidation")
const {loginJoi}=require("../validations/loginValidation")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {userSecretId}=require("../configs/dotenv.config")



const fetchUsers=async(req,res)=>{
    const users=await User.find()
    console.log(users)
    if(users.length===0){
        return res.status(404).json({status:"failed",message:"can't find users",users})
    }
    res.status(200).json({status:"success",message:"successfully fetch all users",users})
}

const registerUser=async(req,res)=>{
    try {
        const {value,error}=registerJoi.validate(req.body)
    if(error){
        return res.status(400).json({status:"validation Error",message:error.details})
    }
    const {username,email,password,address,admin,bloked,phonenumber,confirmPassword}=value
    const saltRound=8
    const hashedPassword=await bcrypt.hash(password,saltRound)

    const registerdUser= new User({
        confirmPassword,
        phonenumber,
        bloked,
        admin,
        address,
        password:hashedPassword,
        email,
        username

    })
    await registerdUser.save()
    res.status(201).json({status:"created",message:"registration completed",registerdUser})

    } catch (error) {
        res.status(400).json({status:"something wrong",message:error})
        
    }
}
const loginUser=async(req,res)=>{
  try {
    const {value,error}= loginJoi.validate(req.body);
  if(error){
    return res.status(400).json({status:"validation Error",message:error.details})
  }
  const {email,password}=value
const registeredUser= await User.findOne({email})
const matching=await bcrypt.compare(password,registeredUser.password)
console.log(matching);
if(!matching){
    return res.status(404).json({status:"loging failed",message:"password not matching"}) 
}
console.log(registeredUser._id);

const userToken=jwt.sign({id:registeredUser._id,email:registeredUser.email,username:registeredUser.username},userSecretId,{expiresIn:"10m"})
const userRefreshToken=jwt.sign({id:registeredUser._id,email:registeredUser.email,username:registeredUser.username},userSecretId,{expiresIn:"10m"})
res.cookie("userToken",userToken,{
    httpOnly:true,
    secure:true,
    maxAge:10*60*1000,
    sameSite:"lax"

})

res.cookie("userRefreshToken",userRefreshToken,{
    httpOnly:true,
    secure:true,
    maxAge:10*60*1000,
    sameSite:"lax"

})


res.send(registeredUser)
  } catch (error) {
   res.send(error)
    
  }


}


module.exports={fetchUsers,registerUser,loginUser}