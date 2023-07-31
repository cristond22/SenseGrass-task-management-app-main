import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Tasks from "./pages/taskdetails";
import NewTask from "./pages/newtask";
import EditTask from "./pages/edittask";
import React, { useEffect, useState } from "react";

const App = () => {
  const isTokenPresent = () => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    return cookies.some((cookie) => cookie.startsWith("token="));
  };
  
  const [token, settoken] = useState(isTokenPresent() || null)



  useEffect(() => {
    let newToken = isTokenPresent()
    settoken(newToken)
    console.log("TOken is ", token)
  
    
  },[])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login settoken={settoken} />} />
        {token && 
        <>
        <Route path="/" element={<Tasks />} />
        <Route path="/newtask" element={<NewTask />} />
        <Route path="/edittask/:id" element={<EditTask />} />
        </>
        }
        <Route path="*" element={<Navigate to="/login" />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;