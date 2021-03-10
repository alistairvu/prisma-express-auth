import bcrypt from "bcryptjs"
import prisma from "../prisma"
import asyncHandler from "express-async-handler"
import { createToken } from "../utils/jwt"

// @desc    Create new user
// @param   POST /api/users
export const createUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body

  if (!username || !password || !email) {
    return res.status(400).send({ message: "Invalid data" })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
      },
    })

    return res.send({
      userInfo: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token: createToken(newUser.id),
    })
  } catch (err) {
    res.status(403).send({ message: err.message })
  }
})

// @desc    Sign user in
// @param   PUT /api/users
export const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body

  if (!login || !password) {
    return res.status(400).send({ message: "Invalid data" })
  }

  const matchingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: login }, { username: login }],
    },
  })

  if (!matchingUser) {
    return res.status(401).send({ message: "Wrong login or password" })
  }

  const passwordMatch = await bcrypt.compare(password, matchingUser.password)

  if (passwordMatch) {
    res.send({
      userInfo: {
        id: matchingUser.id,
        username: matchingUser.username,
        email: matchingUser.email,
      },
      token: createToken(matchingUser.id),
    })
  } else {
    res.status(401).send({ message: "Wrong login or password" })
  }
})
