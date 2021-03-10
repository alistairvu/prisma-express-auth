import jwt from "jsonwebtoken"

export const createToken = (id: string) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET as string)
  return token
}
