import express from "express";
import { CreateUser, changeUserStatus, listUser } from "../controller/User.js";


const router = express.Router()

router.post("user", CreateUser)
router.put("changestatus", changeUserStatus)
router.put("changestatus",listUser )

export default router;