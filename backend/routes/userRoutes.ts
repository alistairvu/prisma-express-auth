import express from "express"
import { createUser, loginUser } from "../controllers/userControllers"

const router = express.Router()

router.route("/").post(createUser).put(loginUser)

export default router
