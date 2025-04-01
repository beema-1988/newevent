const mongoose=require('mongoose')




const ticketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ['VIP', 'General Admission'], required: true },
  price: { type: Number, required: true },
  promoCode: { type: String },
  paymentStatus: { type: String, enum: ['paid', 'unpaid'], required: true }
});

module.exports=mongoose.model('ticket',ticketSchema)
