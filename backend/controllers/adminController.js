import adminModel from '../models/adminModel.js';
import jwt from 'jsonwebtoken';

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    
    if (!admin) {
      return res.json({ success: false, message: 'Admin not found' });
    }

    // Direct password comparison since it's stored as plain text
    if (password !== admin.password) {
      return res.json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.json({ 
      success: true, 
      token,
      data: {
        email: admin.email
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Something went wrong' });
  }
};

export { loginAdmin };