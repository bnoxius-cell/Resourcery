import bcrypt from 'bcriptjs'

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.json({success: false, message: 'All fields are required'})
    }

    try {


    } catch (error) {
        res.json({success: false, message: error.message})
    }

}