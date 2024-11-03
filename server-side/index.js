
const express=require("express")
const app=express()
app.use(express.json())
const authRoutes=require("./allRoutes/authRoutes")
const connectDB=require("./configs/db")
require("./configs/dotenv.config")
const cookieParser=require("cookie-parser")
const port=process.env.PORT||5000
app.use(cookieParser())
// app.use("/",authRoutes)
app.use("/users",authRoutes)

connectDB()



app.listen(port,()=>{
    console.log(`server started on ${port} port`);
    
})