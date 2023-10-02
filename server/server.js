const express = require("express");

const cors = require('cors')
const app = express();
const cookies = require('cookie-parser');
const { Socket } = require("socket.io");
require('dotenv').config();

const PORT = process.env.PORT;
const DB = process.env.DB;
require('./config/mongoose.config')(DB)
require('./config/jwt.config')
app.use(
    express.json(),
    express.urlencoded({ extended: true }),
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    }),
    cookies()
);
app.use(express.static('public'));

const server = app.listen(PORT, () => console.log(`🚀🚀🚀🚀 >>> SERVER IS RUNNING ON PORT ${PORT} <<< 🚀🚀🚀`))

require('./routes/users.routes')(app)
require('./routes/devices.routes')(app)
require('./routes/files.routes')(app)
const io = require('socket.io')(server,{cors:true})

io.on("connection",socket => 
{
    console.log(socket.id)
})

