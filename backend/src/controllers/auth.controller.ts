import { Account, User } from '../models';
import { Request, Response } from "express";
import { validateUser } from "../types/user";
import AuthService from "../services/authService"
import zod from "zod"

export const signin = async(req:Request,res:Response)=>{
    const {username , password} = req.body
    const validateSigninSchema = zod.object({
        username:zod.string().email().min(5),
        password:zod.string().min(5)
    })

    if(!validateSigninSchema.safeParse({username,password}).success) return res.status(411).json({isSuccess:false,message:"Invalid parameters"})

    const user = await User.findOne({username,password})
    if(!user) return  res.status(411).json({isSuccess:false,message:"Invalid parameters / user not found"})

    const authService  = new AuthService()
    const token = authService.generateToken(user._id.toString())

    return res.status(200).json({isSuccess:true,message:"sign in successfully",token})
}

export const signup = async(req:Request,res:Response)=>{
    const {firstName,lastName,username,password} = req.body
    if(!validateUser({firstName,lastName,username,password})) return res.status(400).json({isSuccess:false,message:"invalid body"})

    const userExists = await User.findOne({username}).lean()
    if(userExists) return res.status(400).json({isSuccess:false,message:"username already exists"})

    const user = await User.create({firstName,lastName,username,password})
    await Account.create({_userId:user._id,balance: Number(Math.random() * 10000)})

    const authService = new AuthService()
    const token = authService.generateToken(user._id.toString())
    return res.status(201).json({isSuccess:true,message:"Signup successful",token})
}