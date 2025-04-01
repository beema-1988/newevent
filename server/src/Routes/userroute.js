const express=require('express')
const{register,login,getAllUsers,getUserProfile, logout}=require('../controllers/userContoller')
const router=express.Router()

 router.post('/register',register)
 router.post('/login',login)
 router.post('/logout',logout)
 router.get('/userslist', getAllUsers);
 router.get('/profile/:userId', getUserProfile);
 


module.exports=router