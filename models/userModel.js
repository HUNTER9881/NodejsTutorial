const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: [true, "Your phone has already been registered"],
    },
    email: {
        type: String,
        unique: [true, "Your email has already been registered"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    role: {  
        type: String,
        enum: [
            "admin", 
            "user", 
        ],
        default: "user"
    }, 
},{
    timestamps: true
})

User.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})



module.exports = mongoose.model('user', User)


