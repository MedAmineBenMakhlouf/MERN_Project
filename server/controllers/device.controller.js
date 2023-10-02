const Device = require('../models/device.model')
const User = require('../models/user.model')
const File = require('../models/file.model')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET = process.env.SECRET

module.exports = {

    findAllMine: async (req, res) => {
        const { id: userId } = jwt.verify(req.cookies.userToken, SECRET)
        try {

            const device = await Device.find({ user: { $eq: userId } }).populate('files')
            res.status(200).json(device)

        } catch (error) {
            res.status(400).json(error)
        }
    },

    findAllExceptMine: async (req, res) => {
        const { id: userId } = jwt.verify(req.cookies.userToken, SECRET)
        try {

            const device = await Device.find({ user: { $ne: userId } }).populate('user').populate('files')
            res.status(200).json(device)

        } catch (error) {
            res.status(400).json(error)
        }
    },

    findOne: async (req, res) => {
        try {
            const device = await Device.findById(req.params.id).populate('user').populate('files')
            res.status(200).json(device)
        }
        catch (error) {
            res.status(400).json(error)
        }
    },

    create: async (req, res) => {
        const { id: userId } = jwt.verify(req.cookies.userToken, SECRET)
        try {
            const newDevice = await Device.create({ ...req.body, user: userId })
            await User.findByIdAndUpdate(userId, { $push: { devices: newDevice._id } })
            res.status(201).json(newDevice)

        } catch (error) {
            res.status(400).json(error)
        }
    },

    update: async (req, res) => {
        try {
            const deviceUpdated = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            res.status(200).json(deviceUpdated)

        } catch (error) {
            res.status(400).json(error)
        }
    },

    delete: async (req, res) => {
        try {
            const { id: userId } = jwt.verify(req.cookies.userToken, SECRET);
            const { id: deviceId } = req.params
            try {
                const deletedDevice = await Device.findByIdAndDelete(deviceId)
                await User.findByIdAndUpdate(userId, { $pull: { devices: deviceId } })
                await File.deleteMany({ device: deletedDevice._id })
                res.status(200).json(deletedDevice)
            } catch (error) {
                res.status(400).json(error)
            }
        } catch (error) {
            console.error("JWT Verification Error:", error);
            res.status(401).json({ error: "Invalid token" });
        }

    },
    findAll: async (req, res) => {
        try {

            const devices = await Device.find().populate('user').populate('files')
            res.status(200).json(devices)

        } catch (error) {
            res.status(400).json(error)
        }
    },
    findDevice: async (req, res) => {
        const { id: userId } = jwt.verify(req.cookies.userToken, SECRET)
        try {
            const device = await Device.find({ type: req.body.text, user: { $ne: userId } }).populate('user').populate('files')
            res.status(200).json(device)
        }
        catch (error) {
            res.status(400).json(error)
        }
    }
}