
const messagesController = require ("../controllers/messages.controller")

module.exports = (app) =>{
app.post("/api/message/addmsg/", messagesController.addMessage);
app.post("/api/message/getmsg/", messagesController.getAllMessage);
}
