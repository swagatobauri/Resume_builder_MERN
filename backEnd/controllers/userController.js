import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// GENERATE A TOKEN JWT
const generateToken = (userid) =>{
    return jwt.sign({id:userid},process.env.JWT_SECRET,{expiresIn:'7d'})
}



export const registerUser = async (req,res) =>{
    try{
        const {name,email,password} = req.body;

        // CHECK IF USER ALREADY EXISTS
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }
        if(password.length < 8){
            res.status(400).json({succes: false, message:"password must be atleast 8 charecter"})
        }
        // HASHING PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        // CREATE A USER
        const user = await User.create({
            name,
            email,
            password: hashedpassword
        })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id)
        })
    }
    catch(error){
        res.status(500).json({message: "Server error",
            error: error.message
        })
    }
}

// LOGIN FUNCTION 
export const loginUser = async (req,res) =>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})

        if (!user){
            return res.status(500).json({message: "Invalid email or password"})
        }

        // COMPARE THE PASSOWRD
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
             return res.status(500).json({message: "Invalid email or password"})
        }
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id)
        })
    }
    catch(error){
        res.status(500).json({message: "Server error",
            error: error.message
        })
    }
}

// GETUSER PROFILE FUNCTION 
export const getUserProfile = async (req,res)=>{
    try{
        const user = await user.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        res.json(user)
    } catch(error){
        res.status(500).json({message: "Server error",
            error: error.message
        })
    }
    
}