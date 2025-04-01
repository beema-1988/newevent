const mongoose=require('mongoose')

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true,unique:true},
    description: { type: String,required: true },
     date: { type: Date, required: true },
     time: { type: String, required: true },

    
    venue: { type: String, required: true },
    image: { type: String, required: true },
})

module.exports=mongoose.model('events',eventSchema)
  