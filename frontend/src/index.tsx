import { render } from "react-dom"
import App from "./App"
import "./bootstrap.min.css"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./redux"
import Spinner from "react-bootstrap/Spinner"
import { BrowserRouter as Router } from "react-router-dom"

const rootElement = document.getElementById("root")

render(
  <Provider store={store}>
    <PersistGate loading={<Spinner animation="border" />} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  rootElement
)
