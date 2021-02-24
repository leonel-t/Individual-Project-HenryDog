import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchDogs } from '../../actions';
import Card from '../card';
import "./style.css"

function Home(props) {
  const [name, setName] = useState("");

  function handleClick(e){
    e.preventDefault();
    props.searchDogs(name)
  };

  return (
    <div className="home">
      <div className="optionBar">
        <span className="icon">Henry Dog</span>
        <div>
        <span className="selectortext">Sort by:</span>
        <select className="orden">
          <option>ascending name</option>
          <option>descending name</option>
          <option>weight ascending</option>
          <option>weight descending</option>
        </select>
        </div>
        <div>
        <span className="selectortext">Filter by:</span>
        <select className="orden">
          <option>temperament</option>
        </select>
        </div>
        <div>
        <input type="search" className="search" onChange={e => setName(e.target.value)}/>
        <input type="submit" value="search" className="buton" onClick={e=>handleClick(e)}/>
        </div>
      </div>
      <div className="paginado">paginado</div>
      <div className="cards">
        {
          props.dogs.map(d => <Card dog={d} />)
        }
      </div>
    </div>
  )
};

function mapStateToProps(state) {
  return {
    dogs: state.dogs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchDogs: dog => dispatch(searchDogs(dog))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);