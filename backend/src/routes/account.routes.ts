import express from "express"
import {getUserBalance, transferMoney} from "../controllers"
const router = express.Router()

router.get("/balance",getUserBalance)
router.post("/transfer",transferMoney)

export default router