const deviceController = require('../controllers/device.controller')



module.exports = app => {
    app.post('/api/devices', deviceController.create)
    app.get('/api/devices', deviceController.findAllMine)
    app.get('/api/devices/ExceptMine', deviceController.findAllExceptMine)
    app.get('/api/devices/allDevices', deviceController.findAll)
    app.get('/api/devices/:id', deviceController.findOne)
    app.delete('/api/devices/:id', deviceController.delete)
    app.put('/api/devices/:id', deviceController.update)
    app.post('/api/device', deviceController.findDevice)


}