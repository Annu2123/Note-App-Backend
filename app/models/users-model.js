const {Schema,model}=require('mongoose')
const usersSchema=new Schema({
    userName:String,
    password:String,
    email:String
})
const User=model('User',usersSchema)
module.exports=User