import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTemperaments, searchDogs } from '../../actions';
import Card from '../card';
import "./style.css"

function Home(props) {
  useEffect(()=>{
    props.getTemperaments();
  },[]);
  const [name, setName] = useState("");
  const [order, setOrder] = useState("0");
  const [temperament, setTemperament] = useState("");
  const [filtred, setFiltred] = useState([]);
  const [page, setPage] = useState("1");

  useEffect(()=>{
    setFiltred(props.dogs.filter( d=> d.temperament.toLowerCase().includes(temperament.toLowerCase())))
  },[temperament,props.dogs])

  function handleSet(e){
    e.preventDefault();
    setTemperament(e.target.value);
  }

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
        <select className="orden" onChange={e=>setOrder(e.target.value)}>
          <option value="0">name ascending</option>
          <option value="1">name descending</option>
          <option value="2">weight ascending</option>
          <option value="3">weight descending</option>
        </select>
        </div>
        <div>
        <span className="selectortext">Filter by:</span>
        <select className="filtro" onChange={handleSet}>
          <option value="">temperament</option>
          {
            props.temperaments.map(t=><option>{t.name}</option>)
          }
        </select>
        </div>
        <div>
        <input type="search" className="search" onChange={e => setName(e.target.value)}/>
        <input type="submit" value="search" className="buton" onClick={e=>handleClick(e)}/>
        </div>
      </div>
      <div className="paginado">
        {
          (()=>{
            const pages = [];
            for(var i=1;i<=Math.ceil(filtred.length/8);i++){
              pages.push(<input type="button" value={i} className="page" onClick={(e)=>setPage(e.target.value)}/>)
            }
            return pages
          })()
        }
      </div>
      <div className="cards">
        {
          filtred.sort((a,b)=>{
            switch (order) {
              case "1":
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              case "2":
                if (parseFloat(a.weight.split(" - ")[0]) < parseFloat(b.weight.split(" - ")[0])) {
                  return -1;
                }
                if (parseFloat(a.weight.split(" - ")[0]) > parseFloat(b.weight.split(" - ")[0])) {
                  return 1;
                }
                return 0;
              case "3":
                if (parseFloat(a.weight.split(" - ")[0]) > parseFloat(b.weight.split(" - ")[0])) {
                  return -1;
                }
                if (parseFloat(a.weight.split(" - ")[0]) < parseFloat(b.weight.split(" - ")[0])) {
                  return 1;
                }
                return 0;
              default:
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
            }
          })
          .slice((8*(parseInt(page)-1)),(8*parseInt(page)))
          .map(d => <Card dog={d} />)
        }
      </div>
    </div>
  )
};

function mapStateToProps(state) {
  return {
    dogs: state.dogs,
    temperaments: state.temperaments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchDogs: dog => dispatch(searchDogs(dog)),
    getTemperaments: ()=>dispatch(getTemperaments())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);