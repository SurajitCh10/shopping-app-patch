import React, { useCallback, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../resources/CDAC.jpg";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Cookies from "universal-cookie";
import { message } from "antd";

function Navbar() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const addToList = () => {
    Axios.post("http://localhost:4000/logout", {
      // withCredentials: true,
      // headers: {
      //   'Authorization': 'Bearer ' + cookies.get('token')
      // }
      token: cookies.get("token"),
    })
      .then(function (response) {
        message.success("Logged out successfully");

        cookies.remove("token");

        setTimeout(function () {
          navigate("/login");
        }, 1000);
      })
      .catch(function (error) {
        message.error(`${error.response.data.message}`);
      });
  };

  return (
    <nav className="navbar fixed-top  navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link style={{ textDecoration: "none" }} to="/">
          <a className="navbar-brand">
            {" "}
            <img
              className="img-fluid"
              style={{ width: "100%", maxWidth: "70px", height: "auto" }}
              src={logo}
              alt=""
            />
            C-Kart
          </a>
        </Link>

        <div className="" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <ul className="navbar-nav">
            <Button
              onClick={addToList}
              style={{
                borderRadius: 12,
                backgroundColor: "Red",
                padding: "5px",
                fontSize: "16px",
              }}
              variant="contained"
            >
              Logout
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
