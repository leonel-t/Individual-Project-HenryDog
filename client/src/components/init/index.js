import React from 'react';
import { NavLink } from 'react-router-dom';
import "./style.css"

function Init() {
  return (
    <div className = "main">
      <span className = "txt">Henry Dog</span>
      <NavLink to={"/home"} className = "btn">Go Home</NavLink>
    </div>
  )
};

export default Init;