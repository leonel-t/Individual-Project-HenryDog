import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTemperaments } from '../../actions';
import "./style.css"

function Add(props) {
  useEffect(() => {
    props.getTemperaments();
  }, []);
  
  const [temperament, setTemperament] = useState("");
  const [data, setData] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    years_of_life: "",
    temperaments: []
  })

  const handleInputChange = function (e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  function handleClick(e){
    if(e.target.name === "add"){
      const aux = data.temperaments;
      aux.push(temperament);
      setData({
        ...data,
        temperaments: aux
      });
    }
    else if(e.target.name === "clean"){
      setData({
        ...data,
        temperaments: []
      });
    }
  }

function handleSubmit(e){
    axios.post("http://localhost:3001/dog",{data})
  }

  return (
    <div className="add">
      <div className="optionBar">
        <Link to='/home'>
          <span className="icon">Henry Dog</span>
        </Link>
      </div>
      <form className="controled-form" onSubmit={handleSubmit}>
        <label>
          Breed name:
          <input type="text" name="name" onChange={handleInputChange} value={data.name}/>
        </label>
        <label>
          Picture(link):
          <input type="text" name="image" onChange={handleInputChange} value={data.image}/>
        </label>
        <label>
          Height(cm):
          <input type="text" name="height" onChange={handleInputChange} value={data.height}/>
        </label>
        <label>
          Weight(kg):
          <input type="text" name="weight" onChange={handleInputChange} value={data.weight}/>
        </label>
        <label>
          Years of life:
          <input type="text" name="years_of_life" onChange={handleInputChange} value={data.years_of_life}/>
        </label>
        <label>
          <select onChange={e=>setTemperament(e.target.value)}>
            <option>temperament</option>
            {
              props.temperaments.map(t => <option>{t.name}</option>)
            }
          </select>
          <button type="button" name="add" onClick={handleClick}>Add temperament</button>
          <button type="button" name="clean" onClick={handleClick}>Clean temperaments</button>
        </label>
        <label>
          Temperaments: {data.temperaments.join(", ")}
        </label>
        <button type="submit" className="submit">Upload</button>
      </form>
    </div>
  )
};

function mapStateToProps(state) {
  return {
    temperaments: state.temperaments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTemperaments: () => dispatch(getTemperaments())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);