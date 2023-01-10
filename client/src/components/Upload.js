import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import "./Menu.css";
import Axios from "axios";
import { message, Table } from "antd";
import Cookies from "universal-cookie";

const columns = [
  {
    title: "Sl No.",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Path",
    dataIndex: "path",
    key: "path",
    render: (text, record) => <a href={"file://" + record.path}>{text}</a>,
  },
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
  formData.append("file", file);

  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const cookies = new Cookies();
  const addToList = (e) => {
    e.preventDefault();

    Axios.post(
      "http://localhost:4000/upload",
      {
        // token: cookies.get('token'),
        file,
      },
      config
    )
      .then(function (response) {
        message.success(`${response.data}`);

        Axios.get("http://localhost:4000/view").then((res) => {
          setData(res.data);
        });
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

    Axios.get("http://localhost:4000/view")
      .then((res) => {
        for (let i = 0; i < res.data.length; i++)
          setData((data) => [...data, res.data[i]]);
      })
      .catch(function (error) {
        message.error(`${error.response.data.message}`);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}></div>
      <div className="row pt-4 mt-4 ml-3 pb-3">
        <form onSubmit={addToList}>
          <input type="file" onChange={handleChange} />
          <input type="submit" value="Upload File" />
        </form>

        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
}

export default Upload;
