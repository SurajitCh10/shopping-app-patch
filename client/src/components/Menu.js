import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import upload from "../resources/upload.jpeg";
import electr from "../resources/electr.jpeg";
import grocery from "../resources/grocery.jpeg";
import book from "../resources/book.jpeg";
import "./Menu.css";
import Axios from "axios";
import Cookies from "universal-cookie";


function Menus() {

  const config = { headers: { "Content-Type": "application/json" } };
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false)

  const token = cookies.get('token');

    useEffect(() => {

    Axios.post('http://localhost:4000/check', {
      token: cookies.get('token')
    }).then((res) => {
      if(res.data.y8a3 === 'LMOFNINCNOI') {
        setValid(false)
        navigate('/login');
      }else{
        setValid(true)
      }
    }).catch(() => {
      setValid(false)
      navigate('/login');
    });
  
      setInterval(() => {
        
        if(!cookies.get('token') || cookies.get('token') != token) {
          
          Axios.post('http://localhost:4000/logout', {
            token
          }).then(() => {
            cookies.remove('token');
            navigate("/login");
            window.location.reload();
          });

        }

    }, 1000);

  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [click, setClick] = useState(false);
  useEffect(() => {
    document.title = "Menu";
  }, []);

  return (
    valid?<>
    <Navbar />

    <div sty className="menu row pt-4 mt-4 ml-3 pb-3">
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => {
            setClick(click === true ? false : true);
          }}
          style={{
            borderRadius: 5,
            backgroundColor: "Blue",
            padding: "5px",
            fontSize: "16px",
          }}
          variant="contained"
        >
          {click ? <>Close Time</> : <>Show Time</>}
        </Button>

        {click ? (
          <>
            <h5 style={{ paddingLeft: "5px" }}>{`${curr_time()}`}</h5>
          </>
        ) : (
          <></>
        )}
        {/* <h5 style={{ paddingLeft: "5px" }}>{`${curr_time()}`}</h5> */}
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12">
        <Link to="/upload" style={{ textDecoration: "none" }}>
          <Card
            sx={{ margin: 5, maxWidth: 345 }}
            style={{ textAlign: "center" }}
          >
            <CardActionArea>
              <div className="d-flex justify-content-center">
                <CardMedia
                  component="img"
                  backgroundColor="Black"
                  image={upload}
                  style={{
                    width: "100px",
                    height: "100px",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  className="img-fluid"
                  alt="upload"
                />
              </div>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Upload
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload Your files here
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12">
        <Link to="/submenu/1" style={{ textDecoration: "none" }}>
          <Card
            sx={{ margin: 5, maxWidth: 345 }}
            style={{ textAlign: "center" }}
          >
            <CardActionArea>
              <div className="d-flex justify-content-center">
                <CardMedia
                  component="img"
                  backgroundColor="Black"
                  image={electr}
                  style={{ width: "100px", height: "100px" }}
                  className="img-fluid"
                  alt="upload"
                />
              </div>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Electonics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to see the electronics items
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>

      <div className="col-lg-3 col-md-6 col-sm-12">
        <Link to="/submenu/2" style={{ textDecoration: "none" }}>
          <Card
            sx={{ margin: 5, maxWidth: 345 }}
            style={{ textAlign: "center" }}
          >
            <CardActionArea>
              <div className="d-flex justify-content-center">
                <CardMedia
                  component="img"
                  backgroundColor="Black"
                  image={grocery}
                  style={{ width: "100px", height: "100px" }}
                  className="img-fluid"
                  alt="upload"
                />
              </div>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Grocery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to see the grocery items
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>

      <div className="col-lg-3 col-md-6 col-sm-12">
        <Link to="/submenu/3" style={{ textDecoration: "none" }}>
          <Card
            sx={{ margin: 5, maxWidth: 345 }}
            style={{ textAlign: "center" }}
          >
            <CardActionArea>
              <div className="d-flex justify-content-center">
                <CardMedia
                  component="img"
                  backgroundColor="Black"
                  image={book}
                  style={{ width: "100px", height: "100px" }}
                  className="img-fluid"
                  alt="upload"
                />
              </div>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Books
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to see the Books time
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>
    </div>
  </>:<></>
  );
}

export default Menus;