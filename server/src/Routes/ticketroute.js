const express=require('express')
const router=express.Router()
const {create,getAll,ticketDetails,getTicketsByEventId,deleteTicket,updateTicket}=require("../controllers/ticketcontroller")
const{auth,adminOnly}=require('../Middleware/authAdmin')



// router.post('/create',auth,adminOnly,create)
router.post('/create',create)
router.get('/ticketlist',getAll)
router.get('/ticketdetails/:ticketId', ticketDetails)
// router.get("/:ticketId/price", getTicketPriceById);
router.get("/event/:eventId", getTicketsByEventId);
router.delete('/delete/:ticketId',deleteTicket)
router.put('/update/:ticketId',updateTicket)
module.exports=router