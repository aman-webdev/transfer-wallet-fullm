import mongoose from "mongoose"

const connectDB = (url:string) => {
    mongoose.connect(url).then(()=>console.log("Connected to DB")).catch(err=>console.log(err))
}

export default connectDB