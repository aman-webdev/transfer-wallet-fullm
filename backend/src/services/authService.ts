import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()

const SECRET = process.env.JWT_SECRET || 'secret'

class AuthService {

    generateToken(userId:string) {
        const token = jwt.sign({userId},SECRET)
        return token
    }

    verifyToken(token:string) {
        try{
            const data = jwt.verify(token,SECRET)
            return data
        }catch(err){
            throw err
        }
    }

}

export default AuthService