import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "./actions"
import Cookies from "js-cookie"

interface UserInfoInterface {
  id: string
  username: string
  email: string
}

const initialState = {
  isLoading: false,
  error: "",
  userInfo: {} as UserInfoInterface,
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    logoutUser: () => {
      Cookies.remove("token")
      return initialState
    },

    resetError: (state) => {
      state.error = ""
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, () => ({
      ...initialState,
      isLoading: true,
    }))

    builder.addCase(loginUser.rejected, (_, action) => ({
      ...initialState,
      error: action.payload as string,
    }))

    builder.addCase(loginUser.fulfilled, (_, action) => ({
      ...initialState,
      userInfo: action.payload,
    }))

    builder.addCase(registerUser.pending, () => ({
      ...initialState,
      isLoading: true,
    }))

    builder.addCase(registerUser.rejected, (_, action) => ({
      ...initialState,
      error: action.payload as string,
    }))

    builder.addCase(registerUser.fulfilled, (_, action) => ({
      ...initialState,
      userInfo: action.payload,
    }))
  },
})

const { actions, reducer: userReducer } = userSlice
export const { logoutUser, resetError } = actions
export { loginUser, registerUser }
export default userReducer
