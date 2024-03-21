import { NextFunction, Request, Response } from "express";
import AuthService from "../services/authService";

const handleAuth = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const auth = req.headers['authorization']
        const token = auth?.split("Bearer ").pop()
        if(!token) return res.sendStatus(400)
        const authService = new AuthService()
        const user = authService.verifyToken(token) as {userId:string}
        req.userId = user.userId
        next()
    }catch(err){
        return res.status(403).json({isSuccess:false,message: "something went wrong / invalid token" })
    }
    
    

}

export default handleAuth