const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
const {Device,DeviceSchema} = require('./device.model')


const UserSchema = new mongoose.Schema({
    role:{
        type: String,
        required: [true, "Role is required"],
    },
    userName: {
        type: String,
        required: [true, "username is required"],
        minlength: [3, "minimum length is 3 character"],
        maxlength:[10,"maximum length is 10 character"]
    },
    country:{
        type:String,
        required:[true,"governorate is required"]
    },
    governorate: {
        type: String,
        required: [true, "governorate is required"],
        minlength: [3, "minimum length is 3"]
    },
    city: {
        type: String,
        required: [true, "city is required"],
        minlength: [3, "minimum length is 3"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone Number is required"],
        minlength: [8, "minimum length is "]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: [isEmail, "Email not valid"],
        unique: [true, "email already in use"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password minimum length is 6"]
    },
    devices :{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Device'
    }

},{timestamps:true})

UserSchema.virtual('confirmPassword')
.get(()=>this._confirmPassword)
.set(value=>this._confirmPassword = value)

UserSchema.pre('validate',function(next){
    // console.log('INSIDE VALIDATE CONFIRM PASSWORD');
    // console.log(`Password: ${this.password} \n Confirm password : ${this.confirmPassword}`);
    if (this.password != this.confirmPassword){
        this.invalidate('confirmPassword', 'Password Must match')
    }
    next()
})

UserSchema.pre('save', async function(next){
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10);
        // console.log('PASSWORD text : ',this.password,'\nPASSWORD hashed : ',hashedPassword);
        this.password= hashedPassword
        next()
    }
    catch(error){
        console.log(error);
    }
    
})
module.exports = mongoose.model("User", UserSchema);