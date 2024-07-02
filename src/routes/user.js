import express from express;
import { CreateUser } from "../controller/User";


const router = express.Router()

router.post("user", CreateUser)

export default router;