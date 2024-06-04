import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
function Navbar() {

  function toggleHamburger() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar-container-right")
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  return (
    <div className="navbar">
      <div className="navbar-container-left">
        <div className="jpstats-title">Japanese Study Statistics</div>
      </div>
      <div className="navbar-container-right">
        <NavLink to="/" className="navbar-item">
          Overview
        </NavLink>
        <NavLink to="/search" className="navbar-item">
          Search
        </NavLink>
        <NavLink to="/graphs" className="navbar-item">
          Graphs
        </NavLink>
        <NavLink to="/heatmap" className="navbar-item">
          Heatmap
        </NavLink>
      </div>
      <div className="hamburger" onClick={toggleHamburger}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
}

export default Navbar;
