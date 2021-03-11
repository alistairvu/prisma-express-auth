import React, { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import { rootState } from "../redux"
import { registerUser } from "../redux/user"
import { Alert } from "react-bootstrap"
import { useHistory, Redirect } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

export const RegisterPage = () => {
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmError, setConfirmError] = useState("")

  const dispatch = useDispatch()
  const { isLoading, error, userInfo } = useSelector(
    (state: rootState) => state.user
  )

  const history = useHistory()

  useEffect(() => {
    if (userInfo.id) {
      history.replace("/home")
    }
  }, [history, userInfo.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value)
    } else {
      setRegisterInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setConfirmError("")

    if (confirmPassword !== registerInfo.password) {
      setConfirmError("Passwords do not match")
      return
    }

    dispatch(registerUser(registerInfo))
  }

  if (userInfo && userInfo.id) {
    return <Redirect to="/home" />
  }

  return (
    <Card className="text-left">
      <Card.Body>
        <Card.Title className="text-center" as="h1">
          Register
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={handleChange}
              value={registerInfo.username}
              name="username"
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={handleChange}
              value={registerInfo.email}
              name="email"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password..."
              onChange={handleChange}
              value={registerInfo.password}
              name="password"
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password..."
              onChange={handleChange}
              value={confirmPassword}
              name="confirmPassword"
            />
          </Form.Group>

          {confirmError && <Alert variant="danger">{confirmError}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </Form>

        <LinkContainer to="/">
          <Card.Link>Click here to sign in.</Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  )
}
