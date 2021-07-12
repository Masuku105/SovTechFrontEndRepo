import './App.css';    
import {Navigation} from './components/Navigation';
import {Chuck} from './components/Chuck/Chuck';
import {Swapi} from './components/Swapi/Swapi';

import{BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <div className="container">            
            <Navigation/>
            <Switch>              
              <Route path='/components/Chuck' component={Chuck}/>
              <Route path='/components/Swapi' component={Swapi}/>
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
