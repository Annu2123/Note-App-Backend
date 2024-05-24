const User=require('../models/users-model')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const {validationResult}=require('express-validator')
const usersCntrl={}

usersCntrl.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body =req.body
    try{
     const user=new User(body)
    const salt=await bcryptjs.genSalt()
    const encryptedPassword= await bcryptjs.hash(user.password,salt)
    user.password=encryptedPassword
    await user.save() 
    res.status(201).json(user)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
// usersCntrl.verifyEmail = async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         res.status(401).json({ errors: errors.array() })
//     }
//     const { email, otp } = req.body
//     console.log(email,otp,'verify')
//     try {
//         const user = await User.findOneAndUpdate({ email: email, otp: otp }, { $set: { isverified: true } }, { new: true })
//         if (!user) {
//             return res.status(401).json("email and otp is not currect")
//         }
//         res.status(201).json("email verified")
//     } catch (err) {
//         console.error("Error verifying email:", err);
//         res.status(500).json({ error: "Internal Server Error" })
//     }
// }
usersCntrl.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(402).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const user=await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({error:"email or password wrong"})
        }
       const password=await bcryptjs.compare(body.password,user.password)
       if(!password){
        return res.status(401).json({error:"email or password is wrong"})
       }
       const tokenData={
        id:user._id,
        role:user.role
       }
       const token=jwt.sign(tokenData,process.env.SECRET_JWT,{expiresIn:"12d"})
       res.status(200).json({token:token})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server error"})
    }
}
usersCntrl.myaccount=async(req,res)=>{
    const id=req.user.id
    try{
        const user=await User.findById(id)
        res.status(200).json(user)
    }catch(err){
   res.status(500).json({error:"internal server error"})       
    }
}

usersCntrl.users=async(req,res)=>{
    try{
        const users=await User.find()
        res.status(200).json(users)
    }catch(err){
   res.status(500).json({error:"internal server error"})       
    }
}
module.exports=usersCntrl