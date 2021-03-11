import Container from "react-bootstrap/Container"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logoutUser } from "./redux/user"
import Cookies from "js-cookie"
import jwt from "jsonwebtoken"
import { Switch, Route } from "react-router-dom"
import { HomePage, LoginPage, RegisterPage } from "./pages"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
        if (err && err.name === "TokenExpiredError") {
          dispatch(logoutUser)
        }
      })
    }
  }, [dispatch])

  return (
    <main>
      <Container className="text-center py-5">
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </main>
  )
}

export default App
