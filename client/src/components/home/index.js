import React from 'react';
import Card from '../card';
import "./style.css"

function Home() {
  const dogs= [
    {
    "id": 1,
    "image": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
    "name": "Affenpinscher",
    "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    "weight": "3 - 6"
    },
    {
    "id": 2,
    "image": "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
    "name": "Afghan Hound",
    "temperament": "Aloof, Clownish, Dignified, Independent, Happy",
    "weight": "23 - 27"
    },
    {
    "id": 3,
    "image": "https://cdn2.thedogapi.com/images/rkiByec47.jpg",
    "name": "African Hunting Dog",
    "temperament": "Wild, Hardworking, Dutiful",
    "weight": "20 - 30"
    },
    {
    "id": 4,
    "image": "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
    "name": "Airedale Terrier",
    "temperament": "Outgoing, Friendly, Alert, Confident, Intelligent, Courageous",
    "weight": "18 - 29"
    },
    {
    "id": 5,
    "image": "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
    "name": "Akbash Dog",
    "temperament": "Loyal, Independent, Intelligent, Brave",
    "weight": "41 - 54"
    },
    {
    "id": 6,
    "image": "https://cdn2.thedogapi.com/images/BFRYBufpm.jpg",
    "name": "Akita",
    "temperament": "Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous",
    "weight": "29 - 52"
    },
    {
    "id": 7,
    "image": "https://cdn2.thedogapi.com/images/33mJ-V3RX.jpg",
    "name": "Alapaha Blue Blood Bulldog",
    "temperament": "Loving, Protective, Trainable, Dutiful, Responsible",
    "weight": "25 - 41"
    }
    ]
  return (
    <div className = "home">
      <div className ="optionBar">
        <span className = "icon">Henry Dog</span>
      </div>
      <div className="paginado">paginado</div>
      <div className = "cards">
        {
          dogs.map(d=><Card dog={d}/>)
        }
      </div>      
    </div>
  )
};

export default Home;