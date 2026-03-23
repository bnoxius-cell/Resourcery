import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../Models/User.js'

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    // all fields check
    if (!name || !email || !password) {
        return res.json({success: false, message: 'All fields are required'})
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
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '12h'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 12 * 60 * 60 * 1000
    
        })

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