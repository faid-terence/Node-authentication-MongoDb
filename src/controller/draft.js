const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require ('../models/User')

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email:email})
    if(!user) {
        return res.status(400).json({message:
            "Invalid Credentials"
        })
    }
    const passwordMatch = bcrypt.compare(password, user.password)
    if(!passwordMatch) {
        return res.status(401).json({message: "Invalid Credentials"})
    }

}


const signUp = async(req,res) => {
    cons
}