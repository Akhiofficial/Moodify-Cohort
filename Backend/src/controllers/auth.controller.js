const userModel = require("../models/users.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerUser(req, res) {

    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isAlreadyRegistered) {
        return res.status(400).json({ message: "User already registered" })
    }

    const hashPassword = await bcrypt.hash(password, 10)


    const user = await userModel.create({
        username,
        email,
        password: hashPassword
    })


    // token generation from jwt
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    // storing token in cookie
    res.cookie("token", token)


    // sending response to client
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })




}

async function loginUser(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
    registerUser,
    loginUser
}