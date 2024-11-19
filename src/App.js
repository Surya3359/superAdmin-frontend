import React, { useState } from "react";
//Css Imports
import "./App.css";
import "./EmployeeList.css";
import "./Header.css";
import "./Slider.css";
import "./ClientList.css";
import "./HostedSites.css";
import "./TemplateAdmin.css";
import Login from "./Pages/Login";
import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import SideBar from "./Component/SideBar";
import HostedSite from "./Pages/HostedSites";
import TemplateAdmin from "./Pages/TemplateAdmin";
import EmployeeList from "./Pages/EmployeeList";
import ClientList from "./Pages/ClientList";
import Approvals from "./Pages/Approvals";





function App() {
  return(
          <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/dashboard" element={<SideBar/>}></Route>
              <Route path="/hosted-list" element={<HostedSite/>}></Route>
              <Route path="/template-admins" element={<TemplateAdmin/>}></Route>
              <Route path="/employee-list" element={<EmployeeList/>}></Route>
              <Route path="/client-list" element={<ClientList/>}></Route>
              <Route path="/approvals" element={<Approvals/>}></Route>
            </Routes>
          </Router>
          </div>
)}

export default App;
