import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import First from './pages/First'
import Second from './pages/Second';

import data from './data.json';
import dataTwo from './data-two.json';

function updateJson(json){

  json.pages = json.tasks;
  delete json.tasks;

  for(let page in json.pages){
    delete json.pages[page].type;
    json.pages[page].title = json.pages[page].description;
    json.pages[page].elements = json.pages[page].tasks;
    delete json.pages[page].description;
    delete json.pages[page].tasks;

    for(let element in json.pages[page].elements) {
      if(json.pages[page].elements[element].type === 'picklist'){
        json.pages[page].elements[element].type = 'radiogroup';
      } else if (json.pages[page].elements[element].type === 'date'){
        json.pages[page].elements[element].type = 'datepicker';
      }
      json.pages[page].elements[element].choices = json.pages[page].elements[element].values;
      delete json.pages[page].elements[element].values;
      for(let choice in json.pages[page].elements[element].choices){
          if(json.pages[page].elements[element].choices[choice].name){
            json.pages[page].elements[element].choices[choice].text = json.pages[page].elements[element].choices[choice].name;
            delete json.pages[page].elements[element].choices[choice].name;
        }
      }
    }

  }
  
  
}

updateJson(data);
updateJson(dataTwo);

const App = ({ history }) => {
  return (
    <div className="App">
      <div className="container">
        <div className="App-header">
          <h2>Welcome to React with SurveyJS</h2>
        </div>
        
        <Router history={history}>
          <nav className="navbar navbar-inverse">
            <ul className="nav navbar-nav">
              <li><Link to="/first">Survey One</Link></li>
              <li><Link to="/second">Survey Two</Link></li>
            </ul>
          </nav>

          <Switch>
            <Route path='/first' render={(props) => <First {...props} data={data} />}/>
            <Route path='/second' render={(props) => <Second {...props} data={dataTwo} />}/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}


export default App;
