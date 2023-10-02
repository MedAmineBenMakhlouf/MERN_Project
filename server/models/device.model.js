const mongoose  = require('mongoose')

const DeviceSchema  = new mongoose.Schema({
    type:{
        type:String,
        required:[true, "Type od device is required"],
    },
    deviceName:{
        type:String,
        required:[true, "Device Name must be present"],
        minlength:[2, "Device Name is Too short"]
    },
    reference:{
        type:String,
        required:[true, "Reference must be present"],
    },
    description:{
        type:String,
        required:[true, "Description must be present"],
        minlength:[4, "Description is Too short"]
    },
    openToExchange : {
        type:Boolean,
        default:false
    },
    price:{
        type:Number,
        required:[true,"the price is required"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    files : {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'File'
    }

}, {timestamps:true});

module.exports = mongoose.model('Device', DeviceSchema);