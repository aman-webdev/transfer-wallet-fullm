import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:1
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:1

    },
    username:{
        type:String,
        unique:true,
        trim:true,
        minLength:5,
        lowercase:true


    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:5


    }
})

export default mongoose.model("user",UserSchema)