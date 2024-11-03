const joi=require("joi")

const registerJoi=joi.object({
    username:joi.string().required(),
    email:joi.string().required(),
    address:joi.string().required(),
    password:joi.string().required(),
    confirmPassword:joi.string().required(),
    phonenumber:joi.number().required(),
    admin:joi.boolean().required(),
    blocked:joi.boolean().required()
})

module.exports={registerJoi}