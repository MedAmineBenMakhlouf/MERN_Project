const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const SECRET = process.env.SECRET

module.exports = {
    register: async (req, res) => {
        const userFromDB = await User.findOne({ email: req.body.email });
        if (userFromDB) {
            res.status(404).json({ error: "this email already exist" })
        }
        else {
            try {
                const user = new User(req.body);
                const newUser = await user.save()
                const userToken = jwt.sign({ id: newUser._id }, SECRET)
                res.status(201).cookie("userToken", userToken, { httpOnly: true }).json(newUser)
            }
            catch (error) {
                res.status(400).json(error)
            }
        }
    },
    login: async (req, res) => {
        const userFromDB = await User.findOne({ email: req.body.email });
        if (!userFromDB) {
            res.status(404).json({ error: "USER NOT FOUND" })
        } else {
            try {
                const isPasswordValid = await bcrypt.compare(req.body.password, userFromDB.password)
                if (isPasswordValid) {
                    const userToken = jwt.sign({ id: userFromDB._id }, SECRET)
                    res.status(200).cookie("userToken", userToken, { httpOnly: true }).json(userFromDB)
                } else {
                    res.status(400).json({ message: "PAssword incorrect" })
                }
            }
            catch (error) {
                res.status(400).json({ message: 'invalid email/password' })
            }
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("userToken")
            res.status(200).json({ message: "User logged out Successfully!!" })
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error })
        }
    },
    getLoggedUser: async (req, res) => {
        try {
            const userToken = req.cookies.userToken;
            const loggedUser = jwt.verify(userToken, SECRET)
            const user = await User.findOne({ _id: loggedUser.id }).populate('devices')
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'no token provided' })
        }
    },
    updateUser: async (req, res) => {
        try {
            const userToken = req.cookies.userToken;
            const loggedUser = jwt.verify(userToken, SECRET)
            const UserUpdated = await User.findByIdAndUpdate(loggedUser.id, req.body, { new: true, runValidators: true })
            res.status(200).json(UserUpdated)

        } catch (error) {
            res.status(400).json(error)
        }
    },
    findAllUsers: async (req, res) => {
        try {
            const user = await User.find()
            res.status(200).json(user)
        }
        catch (error) {
            res.status(400).json(error)
        }
    }

}