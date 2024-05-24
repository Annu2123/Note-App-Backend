const Note=require('../models/note-model')
const {validationResult}=require('express-validator')
const noteCntrl={}
noteCntrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
         return res.status(401).json({errors:errors.array()})
    }
    const body=req.body
    const note=new Note(body)
    note.userId=req.user.id
    try{
        await note.save()
        res.status(201).json(note)
    }catch(err){
        res.status(500).json({errors:"internal server error"})
    }
}
noteCntrl.list=async(req,res)=>{
  try{
        const note= await Note.find()
        res.status(201).json(note)
  }catch(err){
    res.status(500).json({error:"internal server error"})
  }
}
noteCntrl.update=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
         return res.status(401).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
    const user=req.user.id
    console.log(id)
    try{
        // const user=Note.findOne({userId:user,_id:id})
        // if(user.length < 0){
        // return res.status(404).json({error:'internal server '})
        // }
       const note=await  Note.findByIdAndUpdate(id,body,{new:true})
       res.status(201).json(note)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
noteCntrl.myNote=async(req,res)=>{
    //const userId=req.user.id
   try{
    const note=await Note.find({userId:req.user.id})
    res.status(201).json(note)
   }catch(err){
    res.status(500).json({error:"internal server error"})
   }
}

noteCntrl.remove=async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try{
        const note=await Note.findByIdAndDelete(id)
        res.status(201).json(note)
    }catch(err){
        res.status(500).json({error:'internal server error'})
    }
}
noteCntrl.share=async(req,res)=>{
    const noteId = req.params.id
    console.log(req.body)
    try{
        const { userId, permission } = req.body
    
        const note = await Note.findById(noteId)
        if (!note) {
          return res.status(404).json({error:"note not found"})
        }
        const existingShare = note.sharedWith.find(share => share.userId.toString() === userId)
        if (existingShare) {
          existingShare.permission = permission
        } else {
          note.sharedWith.push({ userId, permission })
        }
        await note.save()
        res.status(200).json(note)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
noteCntrl.getShare=async(req,res)=>{
   const userId=req.user.id
   console.log(userId)
   try {
    const sharedNotes = await Note.find({ 'sharedWith.userId': userId })
    res.status(200).json(sharedNotes)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
module.exports=noteCntrl