const jwt = require('jsonwebtoken')
// const bcrypyt = require('bcryptjs')
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config()
const userDb = require('../Models/userModel')

exports.register = async (req, res) => {
    try {

        const { name, email, password,role } = req.body
        const userexists = await userDb.findOne({ email })
        if (userexists)
            return res.status(400).json({ message: "Email already exists" })
        const hashedpassword = await bcrypt.hash(password, 10)
        const newUser = new userDb({ name, email, password: hashedpassword ,role})
        await newUser.save()
        return res.status(200).json({ message: "user registered", data: newUser })
    }
    catch (error) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}


 exports.login = async (req, res) => {
  try {
      console.log("Request body:", req.body);       
  const { email, password } = req.body;

        // Validate input fields
        if (!email || !password || email.trim() === "" || password.trim() === "") {
            return res.status(400).json({ message: "Email and password are required" });
        }

         const normalizedEmail = email.toLowerCase();
        const userExist = await userDb.findOne({ email: normalizedEmail });
       console.log("User query result:", userExist);

        if (!userExist) {
          return res.status(404).json({ message: "User not found" });
        }

       const isMatch = await bcrypt.compare(password, userExist.password);
       if (!isMatch) {
            return res.status(401).json({ message: "Password incorrect" });
        }

        const token = jwt.sign(
            { id: userExist._id, email: userExist.email, role: userExist.role },
             process.env.JWT_secret,
            { expiresIn: '7d' }
       );

        res.cookie('token', token, { httpOnly: true });
         return res.status(200).json({ message: "Logged in successfully", user: userExist });
    } catch (error) {
         return res.status(500).json({ message: "Server error", error: error.message });
    }
};



// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userDb.find(); // Get all users from the database
        return res.status(200).json({ message: "Users retrieved successfully", data: users });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params; // or req.body if you send the userId in the body
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
          }

        // Fetch the user details from the database
        const user = await userDb.findById(userId).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User profile fetched successfully', user });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



