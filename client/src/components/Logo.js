import React from "react";
import logo from "../resources/CDAC.jpg";

function Logo() {
  return (
    <>
      <div className="row pt-4">
        <div className="d-flex justify-content-center">
          <img
            className="img-fluid"
            style={{ width: "100%", maxWidth: "350px", height: "auto" }}
            src={logo}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Logo;
