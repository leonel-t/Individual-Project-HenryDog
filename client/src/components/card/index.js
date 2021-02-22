import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css"

function Card({ dog }) {
  return (
    <Link to={`/detail/${dog.id}`} >
      <div className="card">
        <h2>{dog.name}</h2>
        <img className="img" src={dog.image} alt="dog" />
        <h5 className="temp">{dog.temperament}.</h5>
      </div>
    </Link>
  )
};

export default Card;