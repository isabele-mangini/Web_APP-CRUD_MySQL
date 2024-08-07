import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import AddTest from "./components/AddTest.js";
import TestsList from "./components/TestsList.js";
import Test from "./components/Test.js"

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/test" className="navbar-brand">
            MAGALLY CTF
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/test"} className="nav-link" >
              Tests
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TestsList/>} />
          <Route path="/test" element={<TestsList/>} />
          <Route path="/add" element={<AddTest/>} />
          <Route path="/test/:id" element={<Test/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
