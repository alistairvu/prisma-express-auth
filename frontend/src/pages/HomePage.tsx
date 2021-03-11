import { useSelector, useDispatch } from "react-redux"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { logoutUser } from "../redux/user"
import { rootState } from "../redux"
import { useHistory, Redirect } from "react-router-dom"
import { useEffect } from "react"

export const HomePage = () => {
  const dispatch = useDispatch()
  const [username, id] = useSelector(({ user }: rootState) => [
    user.userInfo.username,
    user.userInfo.id,
  ])

  const history = useHistory()

  useEffect(() => {
    if (!id) {
      history.replace("/")
    }
  }, [id, history])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if (!id) {
    return <Redirect to="/" />
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title as="h1">Hello, {username}!</Card.Title>
        <Card.Text>Click the button below to log out.</Card.Text>

        <Button onClick={handleLogout}>Log out</Button>
      </Card.Body>
    </Card>
  )
}
