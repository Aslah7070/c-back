const joi=require("joi")

const loginJoi=joi.object({
    email:joi.string().required(),
    password:joi.string().required()
})

module.exports={loginJoi}