import React, {Component} from 'react';
import {Match, BrowserRouter as Router, Miss, Redirect} from 'react-router';

import {Home, Intro, NoMatch} from '../pages/';

import {settings} from '../globals';

class App extends Component {

  state = {
    currentIntroStep: 1
  }

  componentWillMount() {
    const storageStep = localStorage.getItem(`currentStep`);
    const {currentIntroStep} = this.state;
    if (!storageStep) localStorage.setItem(`currentStep`, currentIntroStep);
  }

  checkIntroSteps(id) {

    const {introSteps} = settings;
    //const {currentIntroStep} = this.state;
    let currentIntroStep = localStorage.getItem(`currentStep`);

    id = parseInt(id);
    currentIntroStep = parseInt(currentIntroStep);

    //als id groter is dan totaal aantal introstappen (introSteps)
    //of groter dan waar je mag zitten (currentIntroStep) -> false
    if (id > introSteps || id > currentIntroStep) return false;
    else return true;

  }

  changeIntroStepHandler(newStep) {
    const {currentIntroStep} = this.state;
    //als je huidige stap groter is dan de nieuwe, de localstorage niet setten
    //omdat je ook in de verdere stap moet kunnen geraken
    if (currentIntroStep > newStep) return;

    localStorage.setItem(`currentStep`, newStep);

    this.setState({currentIntroStep: newStep});
  }

  render() {

    return (
      <Router>
        <main>

          <Match
            exactly pattern='/'
            component={Home}
          />

          <Match
            pattern='/intro/:id'
            render={({params}) => {

              const {id} = params;
              const stepExists = this.checkIntroSteps(id);

              if (stepExists) return <Intro step={params.id} changeIntroStep={newStep => this.changeIntroStepHandler(newStep)} />;
              else return <Redirect to='/' />;
            }}
          />

          <Miss component={NoMatch} />

        </main>
      </Router>
    );
  }

}

export default App;
