const userController = require('../controllers/user.controller')


module.exports = app => {
    // app.post('/api/register', userController.registerOld)
    app.get('/api/users', userController.findAllUsers)
    app.post('/api/register', userController.register)
    app.post('/api/login', userController.login)
    app.post('/api/logout', userController.logout)
    app.get('/api/loggedUser', userController.getLoggedUser)
    app.put('/api/user/update', userController.updateUser)
}