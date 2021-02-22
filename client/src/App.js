import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/home"
import Init from "./components/init"
import Detail from "./components/details"
import Add from "./components/add"

function App() {
  const test = {
    "id": 5,
    "image": "https://cdn2.thedogapi.com/images/FTQ1C29sk.jpg",
    "name": "Akbash Dog",
    "temperament": "Loyal, Independent, Intelligent, Brave",
    "weight": "41 - 54",
    "height": "71 - 86",
    "years_of_life": "10 - 12 years"
    }
  return (
    <div className="App">
      <BrowserRouter>
      <Route
      exact path = "/"
      render = {()=><Init />}
      />
      <Route
      exact path = "/home"
      render = {()=><Home />}
      />
      <Route
      exact path = "/detail/:dog"
      render = {()=><Detail dog={test}/>}
      />
      <Route
      exact path = "/add"
      render = {()=><Add />}
      />
      </BrowserRouter>
    </div>
  );
}

export default App;
// render={({ match }) => <Ciudad city={onFilter(match.params.ciudadId)}