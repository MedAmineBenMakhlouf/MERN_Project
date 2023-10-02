const File = require('../models/file.model');
const Device = require('../models/device.model')


module.exports = {
    uploadFile: async (req, res) => {
        try {
            const imagePaths = req.files.map(file => 'http://localhost:8000/images/' + file.filename)
            const device = await Device.findById(req.params.id)
            console.log(device)
            imagePaths.map(async (imagePath) => {
                const newFile = await File.create({ path: imagePath,device: device.id})
                await Device.findByIdAndUpdate(device.id,{$push:{files:newFile._id}})
            });
            res.json({ status: "ok" });
        } catch (error) {
            res.json({ status: "ERROR create", error });
        }
    },

    deleteFile: async (req, res) => {
        const {idD: deviceId, idF:fileId } = req.params
        console.log(deviceId,fileId)
        try {
            const deletedFile = await File.findByIdAndDelete(fileId)
            await Device.findByIdAndUpdate(deviceId, { $pull: { files: fileId } })
            res.status(200).json(deletedFile)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
