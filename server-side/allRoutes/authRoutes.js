const express=require("express");
const router=express.Router();
const users=require("../allController/authController")
const {userAuthentication}=require("../middleware/userAuthentication")


router 
.get("/fetchusers",userAuthentication,users.fetchUsers)
.post("/registeruser",users.registerUser)
.post("/login",users.loginUser)


module.exports=router