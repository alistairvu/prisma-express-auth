import React, { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import { rootState } from "../redux"
import { loginUser, resetError } from "../redux/user"
import { Alert } from "react-bootstrap"
import { useHistory, Redirect } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

export const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({ login: "", password: "" })

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
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(resetError())
    dispatch(loginUser(loginInfo))
  }

  if (userInfo && userInfo.id) {
    return <Redirect to="/home" />
  }

  return (
    <Card className="text-left">
      <Card.Body>
        <Card.Title className="text-center" as="h1">
          Log in
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="login">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username or email..."
              onChange={handleChange}
              value={loginInfo.login}
              name="login"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password..."
              onChange={handleChange}
              value={loginInfo.password}
              name="password"
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Signing you in..." : "Sign in"}
          </Button>
        </Form>

        <LinkContainer to="/register">
          <Card.Link>Click here to sign up.</Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  )
}
