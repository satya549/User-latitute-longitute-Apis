import express from "express";
import { CreateUser, changeUserStatus,getDistance, listUser } from "../controller/User.js";
import { tokenValidator } from "../middleware/middleware.js";


const router = express.Router()

router.post("user", CreateUser)
router.put("changestatus",tokenValidator, changeUserStatus)
router.get("/distance", tokenValidator, getDistance)
router.put("/",tokenValidator, listUser )

export default router;