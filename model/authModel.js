import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
    }
}, {Timestamp: true})

const User = mongoose.model('User', userSchema);

export default User;