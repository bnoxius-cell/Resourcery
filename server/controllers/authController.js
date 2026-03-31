import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../Models/User.js'
import transporter from '../config/nodemailer.js'

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    // all fields check
    if (!name || !email || !password) {
        return res.json({success: false, message: 'All fields are required'})
    }

    if (password.length < 8) {
        return res.json({success: false, message: 'Password must be at least 8 characters long'})
    }

    try {
        const existingUser = await userModel.findOne({email})

        // user exist check
        if (existingUser) {
            return res.json({success: false, message: 'User already exists'})
        }
        
        // password hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // register the user
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        // token and cookie distribution upon registration
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '16h'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 16 * 60 * 60 * 1000
        })

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Greetings traveler!',
            text: 'Welcome to Resourcery; your personal vault.'
        }

        await transporter.sendMail(mailOptions);
        
        return res.json({success: true, message: 'Registration successful'})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password, rememberMe} = req.body;

    // all fields check
    if (!email || !password) {
        return res.json({success: false, message: 'All fields are required'})
    }

    try {
        // email check
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success: false, message: 'E-mail does not exist'})
        }

        // password check
        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
            return res.json({success: false, message: 'Invalid password'})
        }

        // expiry dates
        const jwtExpiry = rememberMe ? '30d' : '1d';
        const cookieAge = rememberMe 
            ? 30 * 24 * 60 * 60 * 1000 
            : 1 * 24 * 60 * 60 * 1000;

        // token and cookie distribution upon login
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: jwtExpiry});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: cookieAge
        })
        return res.json({success: true, message: 'Login successful'})
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({success: true, message: 'Logout successful'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return res.json({success: false, message: 'User is already verified.'})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 20 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'OTP Email Verification',
            text: `Your OTP is: ${otp}\n\nThis OTP will expire in 20 minutes.`
        }
        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: 'OTP sent successfully'})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({success: false, message: 'All fields are required'})
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({success: false, message: 'User not found'})
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'})
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({success: false, message: 'OTP has expired'})
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({success: true, message: 'Email verified successfully'})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({success: true, message: 'User is authenticated'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const sendResetOtp = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.json({success: false, message: 'Email is required'})
    }

    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: 'User not found'})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 20 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset Password OTP',
            text: `Your OTP for resetting your password is: ${otp}\n\nThis OTP will expire in 20 minutes.`
        }
        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: 'OTP sent to your email successfully'})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({success: false, message: 'All fields are required'})
    }
    
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: 'User not found'})
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'})
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({success: false, message: 'OTP has expired'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;

        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset Successful',
            text: 'Your password has been reset successfully.\n\nIf you did not request a password reset, please contact our support.'
        }
        await transporter.sendMail(mailoptions);

        return res.json({success: true, message: 'Password reset successfully'})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}