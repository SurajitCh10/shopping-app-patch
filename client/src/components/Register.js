import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";
import { message } from "antd";
import Cookies from 'universal-cookie';
import { inputValidator } from "./Validator";
import { emailValidator } from "./Validator";

function Register() {

  const [csrf, setCsrf] = useState();

  useEffect(() => {
    document.title = "Register";
    
    Axios.get('http://localhost:4000/csrf').then((res) => {
      setCsrf(res.data.csrf);
      console.log(res.data.csrf)
    }).catch((error) => {
      message.error(`${error.response.data.message}`);
    });

  }, []);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [cpassword, setCpassword] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  const addToList = () => {
    setNameError(false);
    setAddressError(false);
    setEmailError(false);
    setPasswordError(false);
    setCpasswordError(false);

    if (!name.match(inputValidator)) {
      setNameError(true);
      return;
    }
    if (!email.match(emailValidator)) {
      setEmailError(true);
      return;
    }
    if (!address.match(inputValidator)) {
      setAddressError(true);
      return;
    }
    if (!password.match(inputValidator)) {
      setPasswordError(true);
      return;
    }

    const config = { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + csrf} };
    const cookies = new Cookies();

    Axios.post(
      "http://localhost:4000/register",
      {
        name: name,
        email: email,
        address: address,
        password: password,
      },
      config
    )
      .then(function (response) {
        message.success("Registered successfully");
        cookies.set('token', response.data.token, {path: '/'});

        setTimeout(function () {
          navigate('/')
        }, 1000);
      })
      .catch(function (error) {
        message.error(`${error.response.data.message}`);
      });
  };

  return (
    <>
      <Logo />

      <div className="d-flex justify-content-center pt-2">
        <h4>Join C-Kart Now</h4>
      </div>

      <div className="row mt-3" style={{ paddingTop: "20px" }}>
        <div className="col-lg-4 col-md-3 col-sm-3"></div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <TextField
            className="fields"
            fullWidth
            required
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            error={nameError}
          />
        </div>
        <div className=""></div>
      </div>

      <div className="row" style={{ paddingTop: "10px" }}>
        <div className="col-lg-4 col-md-3 col-sm-3"></div>
        <div className="col-lg-4 col-md-6 col-sm-6">
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
        <div className="col-lg-4 col-md-3 col-sm-3"></div>
      </div>

      <div className="row" style={{ paddingTop: "10px" }}>
        <div className="col-lg-4 col-md-3 col-sm-3"></div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <TextField
            className="fields"
            fullWidth
            required
            id="outlined-basic"
            label="Address"
            variant="outlined"
            onChange={(e) => setAddress(e.target.value)}
            error={addressError}
          />
        </div>
        <div className=""></div>
      </div>

      <div className="row" style={{ paddingTop: "10px" }}>
        <div className="col-lg-4 col-md-3 col-sm-3"></div>
        <div className="col-lg-4 col-md-6 col-sm-6">
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
        <div className="col-lg-4 col-md-3 col-sm-3"></div>
      </div>

      <div className="row pt-3 mt-3">
        <div className="d-flex justify-content-center">
          <Button
            onClick={addToList}
            style={{ fontSize: "18px" }}
            size="large"
            variant="contained"
          >
            Register
          </Button>
        </div>
      </div>

      <div className="row pt-2 mt-2">
        <div className="d-flex justify-content-center">
          <Link style={{ textDecoration: "none" }} to="/login">
            <h6>Click Here to Login</h6>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
