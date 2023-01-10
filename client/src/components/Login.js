import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Cookies from "universal-cookie";
import { message } from "antd";

function Login() {
  useEffect(() => {
    document.title = "Login";
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const addToList = () => {
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }

    const config = { headers: { "Content-Type": "application/json" } };
    const cookies = new Cookies();

    Axios.post(
      "http://localhost:4000/login",
      {
        email: email,
        password: password,
      },
      config
    )
      .then(function (response) {
        message.success("Logged in successfully");

        cookies.set("token", response.data.token, { path: "/" });

        if (response.data.admin) {
          setTimeout(function () {
            navigate(`/landing/${response.data.name}`);
          }, 1000);
        } else {
          setTimeout(function () {
            navigate("/");
          }, 1000);
        }
      })
      .catch(function (error) {
        message.error(`${error.response.data.message}`);
      });
  };

  return (
    <>
      <Logo />
      <div className="d-flex justify-content-center pt-2">
        <h4>Log in to C-Kart</h4>
      </div>
      <div className="row mt-2" style={{ paddingTop: "30px" }}>
        <div className="col-4"></div>
        <div className="col-4">
          <TextField
            className="fields"
            fullWidth
            required
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
        </div>
        <div className="col-4"></div>
      </div>

      <div className="row" style={{ paddingTop: "30px" }}>
        <div className="col-4"></div>
        <div className="col-4">
          <TextField
            className="fields"
            type="password"
            fullWidth
            required
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
        </div>
        <div className="col-4"></div>
      </div>

      <div className="row pt-3 mt-3">
        <div className="d-flex justify-content-center">
          <Button
            onClick={addToList}
            style={{ fontSize: "18px" }}
            size="large"
            variant="contained"
          >
            Login
          </Button>
        </div>
      </div>

      <div className="row pt-2 mt-2">
        <div className="d-flex justify-content-center">
          <Link style={{ textDecoration: "none" }} to="/register">
            <h6>Click Here to Register</h6>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
