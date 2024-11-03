const dotenv=require("dotenv");

dotenv.config()

module.exports={
    mongoUrl: process.env.MONGODB_URL,
    path:process.env.PATH,
    userSecretId:process.env.JWT_TOKEN
}