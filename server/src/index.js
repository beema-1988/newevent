const express=require('express')
const cookieparser=require('cookie-parser')
// const app=express()
const cors=require("cors")
const dotenv=require('dotenv')
// require('dotenv').config()
const connectDB=require('../src/config/db')
const userRoute=require('../src/Routes/userroute')
const adminRoute=require('../src/Routes/adminroute')
const eventRoute=require('../src/Routes/eventRoute')
const ticketRoute=require('../src/Routes/ticketroute')
const paymentRoute=require('../src/Routes/paymentRoute')

dotenv.config()
const app=express()
connectDB()



app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.get('/',(req,res)=>{
    res.send("welcome")
})

app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
app.use('/api/events',eventRoute)
app.use('/api/tickets',ticketRoute)
app.use('/api/payment',paymentRoute)



const PORT=process.env.PORT || 3000;

// if (process.env.NODE_ENV === 'production') {
//   module.exports = app; // Exports the app to be used by Vercel
// }else {
 app.listen(PORT,()=>{
    console.log(`server listening to port ${PORT}`)
 })
//  }