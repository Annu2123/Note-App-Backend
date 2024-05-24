const {Schema,model}=require('mongoose')
const noteShareSchema = new Schema({
    title: String,
    content: String,
    owner: { 
        type:Schema.Types.ObjectId,
        ref: 'User'},
    sharedWith: [
      {
        userId: {
             type: Schema.Types.ObjectId,
              ref: 'User' },
        permission: { type: String, enum: ['read', 'write'], default: 'read' }
      }
    ]
  })
  
  const NoteShare = model('Note', noteShareSchema)
  module.exports = NoteShare