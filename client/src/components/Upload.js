import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import "./Menu.css";
import Axios from "axios";
import { message, Table } from "antd";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const columns = [
  {
      title: 'Sl No.',
      dataIndex: 'id',
      key: 'id'
  },  
  {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
  },
  {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      render: (text, record) => <a href={'file://' + record.path}>{text}</a>
  }
];

function Upload() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const formData = new FormData();
  formData.append('file', file);

  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const cookies = new Cookies();
  const addToList = (e) => {

    e.preventDefault();

     Axios.post(
      "http://localhost:4000/upload",
      {
        // token: cookies.get('token'),
        file
      },
      config
    ).then(function (response) {
        message.success(`${response.data}`);
        
      })
      .catch(function (error) {
        message.error(`${error.response.data.message}`);
      });
  };

  // const handleSubmit = () => {
  //   getBase64(file).then((base64) => {
  //     var existing = JSON.parse(localStorage.getItem("files"));
  //     if (existing == null) existing = [];

  //     localStorage.setItem("testObject", JSON.stringify(base64));
  //     existing.push(base64);
  //     localStorage.setItem("files", JSON.stringify(existing));

  //     // const arr = [`${base64}`];
  //     // localStorage.setItem("files", JSON.stringify(arr));
  //     console.debug("file stored", base64);
  //   });

  //   window.alert(`${file.name} uploaded to local storage`);
  // };

  // const getBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // };

  useEffect(() => {
    document.title = "Upload";

    Axios.get("http://localhost:4000/view").then((res) => {

      for(let i = 0; i < res.data.length; i++)
        setData(data => [...data, res.data[i]]);

    }).catch(function (error) {
      message.error(`${error.response.data.message}`);
    });

  }, []);

  const navigate = useNavigate();

  const token = cookies.get('token');
  const [valid, setValid] = useState(false)

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

    setInterval(() => {
        
      Axios.post('http://localhost:4000/check', {
        token: cookies.get('token')
      }).then((res) => {
        if(res.data.y8a3 === 'LMOFNINCNOI') {
          cookies.remove('token');
          navigate("/login");
          window.location.reload();
        }
      });
    }, 2000);

  }, []);

  return (
    valid?<>
      <Navbar />
      <div className="menu row pt-4 mt-4 ml-3 pb-3">
        <form onSubmit={addToList}>
        <input type="file" onChange={handleChange} />
          {file &&
          !(
            file.name.endsWith(".jpg") ||
            file.name.endsWith(".jpeg") ||
            file.name.endsWith(".text") ||
            file.name.endsWith(".png") ||
            file.name.endsWith(".pdf") ||
            file.name.endsWith(".doc")
          ) ? (
            <>
              {window.confirm("Upload valid file type")
                ? setFile(null)
                : setFile(null)}{" "}
            </>
          ) : (
            <></>
          )}
          {console.log(file)}
          <input type="submit" value="Upload File" />
        </form>

        <Table columns={columns} dataSource={data} />

      </div>
    </>:<></>
  );
}

export default Upload;
