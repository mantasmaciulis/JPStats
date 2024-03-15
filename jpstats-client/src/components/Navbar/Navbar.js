import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar-container-left'>
        <div className='jpstats-title'>Japanese Study Statistics</div>
      </div>
      <div className='navbar-container-right'>
        <NavLink to='/' className='navbar-item'>
          Overview
        </NavLink>
        <NavLink exact to='/search' className='navbar-item'>
          Search
        </NavLink>
        <NavLink to='/accuracy' className='navbar-item'>
          Accuracy
        </NavLink>
        <NavLink to='/heatmap' className='navbar-item'>
          Heatmap
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
