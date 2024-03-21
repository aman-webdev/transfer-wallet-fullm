import { Request, Response } from "express";
import { User } from "../models";
import { User as IUser, userZodSchemaOptional } from "../types/user";

export const updateUser =async (req:Request,res:Response) => {
    const userId = req.userId
    if(!userId) return res.sendStatus(401).json({isSuccess:false,message:"Unauthorized"})
    if(!userZodSchemaOptional.safeParse({...req.body}).success) return res.status(411).json({isSuccess:false,message:"Invalid Params"})
    await User.findOneAndUpdate({_id:userId},{...req.body})
    return res.status(200).json({isSuccess:true,message:"Updated successfully"})
}

export const getUsers = async (req: Request, res: Response)=>{
    const {filter} = req.query
    let users : IUser[] = []
    if(!filter) {
         users = await User.find({}).select({firstName:1,lastName:1,username:1}).lean()
        return res.json({isSuccess:true,users})
    }

     users = await User.find({
        $or: [{
            firstName: { $regex : filter, $options:"i"}
        }, {
            lastName:{ $regex : filter, $options:"i"}
        }],
     }).select({firstName:1,lastName:1,username:1}).lean()

     return res.json({isSuccess:true,users})
     
}