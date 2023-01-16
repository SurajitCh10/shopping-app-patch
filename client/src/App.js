import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import Menus from "./components/Menu";
import Submenu from "./components/Submenu";
import Upload from "./components/Upload";
import Cookies from "universal-cookie";
import Axios from "axios";

const cookies = new Cookies();

function App(){
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

// export default App;

// export function ProtectedRoute(props) {

//   const token = cookies.get('token');
//   alert(token)

//   if(token){
//     Axios.get('http://localhost:4000/check', {
//       token
//     }).then((res) => {
//       if(res.data.y8a3 === 'LMOFNINCNOI') {
//         alert(token);
//         //cookies.remove('token');
//         <Navigate to="/login" />;
//       } else if(res.data.y8a3 === '2') {
//         alert('error');
//       } 
//       else
//         return props.children;
//     }).catch(() => {
//         cookies.remove('token');
//         <Navigate to="/login" />;
//     });

//   } else {
//     return <Navigate to="/login" />;
//   }

 

//   // if (cookies.get("token")) {
//   //   return props.children;
//   // } else {
//   //   return <Navigate to="/login" />;
//   // }
// }

// import React, { Component, useState } from "react";
// import "./App.css";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Landing from "./components/Landing";
// import Menus from "./components/Menu";
// import Submenu from "./components/Submenu";
// import Upload from "./components/Upload";
// import Cookies from "universal-cookie";
// import Axios from "axios";
// import { Result } from "antd";

// const cookies = new Cookies();
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <BrowserRouter>
//           <Routes>
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//             <Route
//               path="landing/:id"
//               element={
//                 <ProtectedRoute>
//                   <Landing />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <Menus />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="menu"
//               element={
//                 <ProtectedRoute>
//                   <Menus />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="submenu/:id"
//               element={
//                 <ProtectedRoute>
//                   <Submenu />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="upload"
//               element={
//                 <ProtectedRoute>
//                   <Upload />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

export default App;

export function ProtectedRoute(props) {

  if (cookies.get("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }

  // var result, fl;

  // if (cookies.get("token")) {
  //   Axios.post('http://localhost:4000/check', {
  //     token: cookies.get('token')
  //   }).then((res) => {
  //     if(res.data.y8a3 === 'LMOFNINCNOI') {
  //       alert('Invalid user');
  //       result = 0;
  //     } else {
  //       alert('Valid user')
  //       result = 1;
  //     }
  //   }).catch(() => {
  //       alert('Invalid user');
  //       result = 0;
  //   });
  // } else {
  //   alert('Invalid user');
  //   result = 0
  // }
  
  // setTimeout(() => {
  // alert(result)

  // if(result === 0)
  //   return <Navigate to="/login" />;
  // else
  //   return <Navigate to="/register" />;
    
  // }, 2000); 
}
