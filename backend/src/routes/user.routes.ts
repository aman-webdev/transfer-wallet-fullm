import express from "express"
import { updateUser } from "../controllers"
import handleAuth from "../middlewares/auth.middleware"
import { getUsers } from "../controllers/user.controller"
const router = express.Router()


router.patch("/update" , handleAuth,updateUser)
router.get("/bulk",getUsers)

export default router