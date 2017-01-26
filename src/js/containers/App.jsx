import React, {Component} from 'react';
import {Match, BrowserRouter as Router, Miss, Redirect} from 'react-router';

import {Home, Intro, NoMatch} from '../pages';

import {settings} from '../globals';

class App extends Component {

  state = {
    currentIntroStep: 1,
    location: ``,
    family: {
      name: ``,
      languages: [],
      members: []
    }
  }

  componentWillMount() {
    const storageStep = localStorage.getItem(`currentStep`);
    const {currentIntroStep} = this.state;
    if (!storageStep) localStorage.setItem(`currentStep`, currentIntroStep);
  }

  checkIntroSteps(id) {

    const {introSteps} = settings;
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

  setLocationHandler(location) {
    if (!location) location = `denied`;
    localStorage.setItem(`location`, location);
    this.setState({location});
  }

  onSpokenLangChangeHandler(language) {
    const {family} = this.state;
    const {languages} = family;

    const index = languages.indexOf(language);

    if (index > - 1) languages.splice(index, 1);
    else languages.push(language);

    family.languages = languages;

    this.setState({family});
  }

  updateFamilyNameHandler(name) {
    const {family} = this.state;
    family.name = name;
    this.setState({family});
  }

  render() {

    console.log(this.state);

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
              const {location, family} = this.state;

              if (stepExists) {
                return (
                  <Intro
                    step={params.id}
                    family={family}
                    updateFamilyName={familyName => this.updateFamilyNameHandler(familyName)}
                    onSpokenLangChange={language => this.onSpokenLangChangeHandler(language)}
                    location={location}
                    setLocation={location => this.setLocationHandler(location)}
                    changeIntroStep={newStep => this.changeIntroStepHandler(newStep)}
                  />
                );
              } else {
                return <Redirect to='/' />;
              }
            }}
          />

          <Miss component={NoMatch} />

        </main>
      </Router>
    );
  }

}

export default App;
