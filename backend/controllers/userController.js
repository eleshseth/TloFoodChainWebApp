import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import nodemailer from 'nodemailer';

//Login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email or mobile number
    const user = await userModel.findOne({
      $or: [
        { email: email },
        { mobile: email } // Using email field to check mobile also
      ]
    });

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: 'The password is incorrect, try again later',
      });
    }

    const token = createToken(user._id);
    res.json({ 
      success: true, 
      token, 
      data: {
        name: user.name,
        email: user.email,
        mobile: user.mobile
      } 
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Something went wrong' });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;  // Add mobile to destructuring
  try {
    // Check whether the user exists or not
    const exist = await userModel.findOne({ 
      $or: [
        { email },
        { mobile }
      ] 
    });
    
    if (exist) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Validating the email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter valid email' });
    }

    // Check the password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Please enter strong password',
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      mobile,  // Add mobile field
      password: hashedPassword,
    });
    
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error in registration' });
  }
};

const checkAuthentication = async (req, res) => {
  try {
    const user = req.user; // This comes from your auth middleware
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Updated Gmail configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // This should be your App Password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset - TLO Food Chain',
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Password reset link sent to your email' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.json({ 
      success: false, 
      message: 'Error sending reset email',
      error: error.message 
    });
  }
};

// Make sure to export the forgotPassword function
export { loginUser, registerUser, checkAuthentication, forgotPassword, resetPassword };

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.json({ success: false, message: 'Invalid reset token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({ 
      success: true, 
      message: 'Password reset successful' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.json({ 
      success: false, 
      message: 'Error resetting password' 
    });
  }
};
