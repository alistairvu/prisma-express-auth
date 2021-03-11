import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"

interface RegisterInterface {
  username: string
  email: string
  password: string
}

interface LoginInterface {
  login: string
  password: string
}

export const registerUser = createAsyncThunk(
  "user/register",
  async (registerData: RegisterInterface, thunkApi) => {
    try {
      const { data } = await axios.post("/api/users", registerData)
      const { userInfo, token } = data
      Cookies.set("token", token)
      return userInfo
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData: LoginInterface, thunkApi) => {
    try {
      const { data } = await axios.put("/api/users", loginData)
      const { userInfo, token } = data
      Cookies.set("token", token)
      return userInfo
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)
