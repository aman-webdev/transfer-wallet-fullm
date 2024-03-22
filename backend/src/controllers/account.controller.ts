import { Request, Response } from "express";
import { Account, User } from "../models";
import zod from "zod"
import mongoose from "mongoose";

export const getUserBalance =async(req:Request,res:Response) =>{
    const {userId} = req
    console.log(userId,'userid')
    if(!userId) return res.sendStatus(404)

    const balance = await Account.findOne({_userId:userId}).lean()
    console.log(balance)
    if(!balance) return res.sendStatus(404)
    return res.json({balance:balance.balance})
}

export const transferMoney = async(req:Request, res:Response) => {
    const {to,amount} = req.body
    const validateSchema = zod.object({
        to:zod.string(),
        amount:zod.number()
    })

    if(!validateSchema.safeParse({to,amount}).success) return res.sendStatus(411)

    const session = await mongoose.startSession()
    session.startTransaction()
    try{
        const balance = await Account.findOne({_userId:req.userId}).session(session).lean()
        if(!balance) {
            session.abortTransaction()
            return res.status(411).json({message:"Invalid Account"})
        }
        if(balance.balance < amount) {
            session.abortTransaction()
            return res.status(411).json({message:"Invalid balance"})
        }
        
       const a1 =  await Account.findOneAndUpdate({_userId:req.userId },{ $inc : {
            balance : -amount
        }},{new:true}).session(session)


       const a2 =  await Account.findOneAndUpdate({_userId:to },{ $inc : {
            balance : amount
        }},{new:true}).session(session)

        console.log(a1,a2)

        await session.commitTransaction()

        return res.json({
            message: "Transfer successful"
        });
    }catch(err) {
        console.log(err)
        session.abortTransaction()

        return res.sendStatus(500)
    }
}