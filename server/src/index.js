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

// app.use(cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000", 
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));
const allowedOrigins = ['https://neweventfront.vercel.app'];


 app.use(cors({
    // origin: ["https://neweventfront.vercel.app","http://localhost:4007"], 
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
     allowedHeaders: ["Content-Type", "Authorization"]
 }));

app.get('/',(req,res)=>{
    res.send("welcome to my pages")
})

app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
app.use('/api/events',eventRoute)
app.use('/api/tickets',ticketRoute)
app.use('/api/payment',paymentRoute)



const PORT=process.env.PORT || 3000;


 app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);

 })