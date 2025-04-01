const express=require('express')
const{create,listEvents,eventsDetails,updateEvent,deleteEvent}=require('../controllers/eventcontroller')
const{auth,adminOnly}=require('../Middleware/authAdmin')
const upload=require("../Middleware/multer")
const router=express.Router()

// router.post('/create',auth,adminOnly,upload.single("image"),create)
router.post('/create',upload.single("image"),create)
router.get('/eventlist',listEvents)
router.get('/eventdetails/:eventId', eventsDetails)
router.put('/update/:eventId',upload.single("image"),updateEvent)
router.delete('/delete/:eventId',deleteEvent)






module.exports=router
