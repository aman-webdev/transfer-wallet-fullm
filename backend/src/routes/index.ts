import express from 'express';
import userRoute from "./user.routes"
import authRoute from "./auth.routes"
import balanceRoute from "./account.routes"
import handleAuth from '../middlewares/auth.middleware';

const defaultRouter = express.Router()

defaultRouter.use("/user",userRoute)
defaultRouter.use("/auth",authRoute)
defaultRouter.use("/account",handleAuth,balanceRoute)



export default defaultRouter