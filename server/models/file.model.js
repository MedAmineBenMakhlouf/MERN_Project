const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: String,
    device:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Device'
    }
},{timestamps:true});

module.exports = mongoose.model('File', fileSchema);
