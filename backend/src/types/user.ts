import mongoose from "mongoose"
import zod from "zod"

export interface User {
    firstName:string,
    username:string,
    password:string,
    lastName:string,
    _id?:string | mongoose.Types.ObjectId
    
}

export const userZodSchema = zod.object({
    firstName:zod.string().min(4),
    lastName:zod.string(),
    username:zod.string().min(4),
    password:zod.string().min(4)
})

export const userZodSchemaOptional = zod.object({
    firstName:zod.string().min(4).optional(),
    lastName:zod.string().optional(),
    username:zod.string().email().optional(),
    password:zod.string().min(4).optional()
})


export const validateUser = (user:User) => {
    const validated = userZodSchema.safeParse(user)
    return validated.success
}