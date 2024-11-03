const mongoose=require("mongoose")

const registerModel=new mongoose.Schema({                
    username:{type:String,required:true,unique:true},
      email:{type:String,required:true,unique:true},
      address:{type:String,required:true},
      password:{type:String,required:true},
      
      phonenumber:{type:Number,required:true,unique:true},
      admin:{type:Boolean,default:false},
      blocked:{type:Boolean,default:false},
})
module.exports=mongoose.model("User",registerModel)