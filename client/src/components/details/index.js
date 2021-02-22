import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css"

function Detail({ dog }) {
  return (
    <div className="detail">
      <div className="optionBar">
        <Link to='/home'>
          <span className="icon">Henry Dog</span>
        </Link>
      </div>
        <div className="dog">
          <h2 className="name">{dog.name}</h2>
          <img className="img-dog" src={dog.image} alt="dog" width="450" height="400" />
          <h5>Temperament: {dog.temperament}.</h5>
          <h5>Weight: {dog.weight} kg.</h5>
          <h5>Height: {dog.height} cm.</h5>
          <h5>Years of life: {dog.years_of_life}</h5>
        </div>
      </div>
  )
};

export default Detail;