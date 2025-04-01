const jwt = require('jsonwebtoken')
require('dotenv').config()
const Admin = require('../Models/adminModel')

exports.auth = async (req, res,next) => {
    try {
        const token = req.cookies.token
        if (!token)
            return res.status(400).json({ message: "authentication error" })
        const decoded = jwt.verify(token, process.env.JWT_secret)
        console.log(decoded)
        req.admin = await Admin.findById(decoded.id)
        if (!req.admin)
            return res.status(400).json({message:"Admin not found"})
        next()
    }
    catch(error){
        
        return res.status(500).json({ message: "server error", error: error.message })
    }
}
exports.adminOnly=(req,res,next)=>{
    if(req.admin.role!=='admin')
        return res.status(400).json({message:"access deneid"})
    next()
}
