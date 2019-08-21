import React, { Component } from "react";
import * as Survey from "survey-react";

import data from './data.json';

import "survey-react/survey.css";
import SurveyCreator from "./SurveyCreator";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import * as widgets from "surveyjs-widgets";

import "icheck/skins/square/blue.css";
window["$"] = window["jQuery"] = $;
require("icheck");


Survey.StylesManager.applyTheme("default");

widgets.icheck(Survey, $);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);


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
      json.pages[page].elements[element].type = 'radiogroup';
      json.pages[page].elements[element].choices = json.pages[page].elements[element].values;
      delete json.pages[page].elements[element].values;
      for(let choice in json.pages[page].elements[element].choices){
        json.pages[page].elements[element].choices[choice].text = json.pages[page].elements[element].choices[choice].name;
        delete json.pages[page].elements[element].choices[choice].name;
      }
    }

  }
  
  
}

updateJson(data);

class App extends Component {
  
  json = {}
  
  onValueChanged(result) {
    console.log("value changed!");
  }

  onComplete(result) {
    console.log("Complete! " + result);
  }

  render() {
    Survey.Survey.cssType = "bootstrap";
    var model = new Survey.Model(data);
    return (
      <div className="App">
        <div className="container">
          <div className="App-header">
            <h2>Welcome to React with SurveyJS</h2>
          </div>

          <div className="surveyjs">
            {/*If you want to show survey, uncomment the line below*/}
            <Survey.Survey
              model={model}
              onComplete={this.onComplete}
              onValueChanged={this.onValueChanged}
            />

            {/*If you do not want to show Survey Creator, comment the line below*/}
            {/* <h1>SurveyJS Creator in action:</h1>
            <SurveyCreator /> */}
            
          </div>

          {/* <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p> */}
        </div>
      </div>
    );
  }
}

export default App;
