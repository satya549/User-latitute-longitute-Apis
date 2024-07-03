import express from "express";
import { CreateUser } from "../controller/User.js";


const router = express.Router()

router.post("user", CreateUser)

export default router;