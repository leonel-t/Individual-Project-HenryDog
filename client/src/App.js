import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/home"
import Init from "./components/init"
import Detail from "./components/details"
import Add from "./components/add"

function App() {
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
      render = {()=><Detail />}
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
