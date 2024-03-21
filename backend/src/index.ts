import express from "express"
import router from "./routes"
import cors from "cors"
import bodyParser from "body-parser"
import connectDB from "./db"
import { config } from "dotenv"

config()
const PORT = process.env.PORT || 3000
connectDB(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/paytm")

const app = express()
app.use(cors())
app.use(bodyParser.json())


app.use("/api/v1",router)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))