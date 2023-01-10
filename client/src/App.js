import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Menus from "./components/Menu";
import Submenu from "./components/Submenu";
import Upload from "./components/Upload";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="landing/:id"
              element={
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Menus />
                </ProtectedRoute>
              }
            />
            <Route
              path="menu"
              element={
                <ProtectedRoute>
                  <Menus />
                </ProtectedRoute>
              }
            />
            <Route
              path="submenu/:id"
              element={
                <ProtectedRoute>
                  <Submenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

export function ProtectedRoute(props) {
  if (cookies.get("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
