import express from "express";
import { CreateUser, changeUserStatus } from "../controller/User.js";


const router = express.Router()

router.post("user", CreateUser)
router.put("changestatus", changeUserStatus)

export default router;