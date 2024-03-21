import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    _userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
        
    },
    balance:{
        type:Number,
        default:0
    }
})

export default mongoose.model("account", AccountSchema)