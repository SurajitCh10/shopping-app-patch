import React, { useEffect, useState } from "react";
import hp from "../resources/hp.png";
import groceries from "../resources/Groceries.png";
import laptop from "../resources/laptop.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Navbar from "./Navbar";
import { useParams , useNavigate} from "react-router-dom";
import Axios from "axios";
import Cookies from "universal-cookie";

const values = [
  {
    image: laptop,
    title: "Laptop",
    content:
      "Laptops That Bring Out the Best In You. While tablets and smartphones are still popular, most people agree that everything, from doing research for an assignment to playing hardcore games, works better on a laptop. It doesnt matter what your lifestyle is, there is always one for you at C-Kart",
  },

  {
    image: groceries,
    title: "Grocery",
    content:
      "Buy grocery and more from brands such as Kellogg's, Tata Gold, Parle G, Lays, etc. Order the online grocery comfortably from home for timely doorstep delivery.",
  },
  {
    image: hp,
    title: "Harry Potter",
    content:
      "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
  },
];

function Submenu() {
  const params = useParams();

  useEffect(() => {
    document.title = "Submenu";
  });

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
        
        if(!cookies.get('token')  || cookies.get('token') != token) {
          
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

  return (
    valid?<>
      <Navbar />

      <div
        style={{ transform: "translate(0%, 40%)" }}
        className="d-flex justify-content-center"
      >
        <Card
          sx={{ width: 500 }}
          style={{ textAlign: "center", cursorPointer: "none" }}
        >
          <CardActionArea>
            <div className="d-flex justify-content-center">
              <CardMedia
                component="img"
                backgroundColor="Black"
                image={values[params.id - 1].image}
                style={{ width: "200px", height: "200px" }}
                className="img-fluid"
                alt="upload"
              />
            </div>

            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {values[params.id - 1].title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {values[params.id - 1].content}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      </>:<></>
  );
}

export default Submenu;
