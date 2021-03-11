import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/userRoutes"
import path from "path"

dotenv.config()

const app = express()
const port = process.env.PORT || 6960

app.use(express.json())
app.use("/api/users", userRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(path.resolve(), "frontend", "build", "index.html")
    )
  )
} else {
  app.get("/api", (req, res) => {
    res.send("API is running...")
  })
}

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
