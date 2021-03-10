import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/userRoutes"

dotenv.config()

const app = express()
const port = process.env.PORT || 6960

app.use(express.json())
app.use("/api/users", userRouter)

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
