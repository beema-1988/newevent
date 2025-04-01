const jwt = require('jsonwebtoken')
const bcrypyt = require('bcryptjs')
require('dotenv').config()
const adminDb = require('../Models/adminModel')

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const alreadyExist = await adminDb.findOne({ email });
        if (alreadyExist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        
        const hashedPassword = await bcrypyt.hash(password, 10);
        const newAdmin = new adminDb({ email, password: hashedPassword, role });
        await newAdmin.save();
        
        return res.status(200).json({ message: "Admin created", data: newAdmin });
    } catch (error) {
        console.error("Server error:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        
        const adminExist = await adminDb.findOne({ email });

        
        if (!adminExist) {
            return res.status(404).json({ message: "Admin not found" });
        }

        console.log(adminExist.role);

        
        const isMatch = await bcrypyt.compare(password, adminExist.password);

        
        if (!isMatch) {
            return res.status(401).json({ message: "Password incorrect" });
        }

        
        const token = jwt.sign(
            { id: adminExist._id, email, role: adminExist.role },
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "Admin logged in successfully", adminExist });
    } catch (error) {
        console.error("Server error:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

