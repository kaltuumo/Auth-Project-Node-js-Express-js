const User = require('../models/usersModels');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Get all users
exports.getUsers = async (req, res) => {
    const { page } = req.query;
    const usersPerPage = 10;
  
    try {
      let userNum = 0;
      if (page <= 1) {
        userNum = 0;
      } else {
        userNum = page - 1;
      }
  
      // Find users with pagination and optional population for relationships if needed
      const result = await User.find()
        .skip(userNum * usersPerPage)
        .limit(usersPerPage)
        .select('fullname email password phone _id'); 
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving users',
        error: error.message,
      });
    }
  };

  // single User
  exports.singleUser = async (req, res) => {
    const { _id } = req.query;
  
    try {
      const existingUser = await User.findOne({ _id }).select('fullname email password phone'); // Add other fields if needed
      if (!existingUser) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found' });
      }
      res
        .status(200)
        .json({ success: true, message: 'Single user', data: existingUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

// Update User

exports.updateUser = async (req, res) => {
  const { _id } = req.query;
  const { fullname, email, password, phone } = req.body;

  try {
      // Check if user exists
      const existingUser = await User.findById(_id);
      if (!existingUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Update only the provided fields
      if (fullname) existingUser.fullname = fullname;
      if (email) existingUser.email = email;
      if (phone) existingUser.phone = phone;

      // Hash password if it's being updated
      if (password) {
          const salt = await bcrypt.genSalt(10);
          existingUser.password = await bcrypt.hash(password, salt);
      }

      // Save updated user
      const updatedUser = await existingUser.save();

      res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Delete usres
exports.deleteUser = async (req, res) => {
    let { _id } = req.query;
    
    // Remove any unwanted whitespace or newline characters
    _id = _id.trim();

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
