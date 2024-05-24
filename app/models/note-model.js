const {Schema,model}=require('mongoose')
const noteSchema=new Schema({
    title:String,
    note:String,
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    sharedWith: [
        {
          userId: {
               type: Schema.Types.ObjectId,
                ref: 'User' },
          permission: { type: String, enum: ['read', 'write'], default: 'read' }
        }
      ]
},{timestamps:true})
const Note=model('Note',noteSchema)
module.exports=Note