import React, {Component} from 'react';
import {Match, BrowserRouter as Router, Miss, Redirect} from 'react-router';

import {Start, Intro, NoMatch} from '../pages';
import {settings, languages} from '../globals';

let router = {};

class App extends Component {

  state = {
    intro: {
      currentStep: 1,
      maxStep: 1
    },
    location: ``,
    family: {
      name: ``,
      languages: [],
      members: []
    },
    search: []
  }

  setRouter(r) {
    router = r;
  }

  componentWillMount() {
    //check everything that's stored in local storage
    this.checkLocalStorageData();
  }

  checkLocalStorageData() {
    //check all data from intro
    this.checkIntroData();
  }

  checkIntroData() {
    const storageMaxStep = localStorage.getItem(`maxStepIntro`);
    const {intro} = this.state;
    const {maxStep} = intro;

    if (!storageMaxStep) {
      localStorage.setItem(`maxStepIntro`, maxStep);
    } else {
      intro.maxStep = storageMaxStep;
      intro.maxStep = parseInt(intro.maxStep);
      this.setState({intro});
    }
  }

  doesIntroStepExist(id) {

    const {totalIntroSteps} = settings;
    let storageMaxStep = localStorage.getItem(`maxStepIntro`);

    id = parseInt(id);
    storageMaxStep = parseInt(storageMaxStep);

    if (id > totalIntroSteps || id > storageMaxStep || isNaN(id)) return false;
    else return true;

  }

  onIntroStepUpdateHandler(newStep) {
    const {intro} = this.state;
    const {maxStep} = intro;

    intro.currentStep = newStep;

    if (maxStep < newStep) {
      localStorage.setItem(`maxStepIntro`, newStep);
      intro.maxStep = newStep;
    }

    this.setState({intro});
  }

  onLocationSubmitHandler(location) {
    if (!location) location = `denied`;
    localStorage.setItem(`location`, location);
    this.setState({location});
  }

  onSpokenLangUpdateHandler(language) {
    const {family} = this.state;
    const {languages} = family;

    const index = languages.indexOf(language);

    if (index > - 1) languages.splice(index, 1);
    else languages.push(language);

    this.setState({family});
  }

  onSearchLangUpdateHandler(search) {
    const allLanguages = languages.all;

    const found = [];

    if (search) {
      allLanguages.forEach((language => {
        if (language.name.toLowerCase().indexOf(search) >= 0
            || language.name.indexOf(search) >= 0
            || language.nativeName.indexOf(search) >= 0
            || language.nativeName.toLowerCase().indexOf(search) >= 0
          ) found.push(language.name);
      }));
    }

    const filtered = found.slice(0, 5);

    this.setState({search: filtered});
  }

  onFamilyNameUpdateHandler(name) {
    const {family} = this.state;
    family.name = name;
    this.setState({family});
  }

  onFamilyNameSubmitHandler(e, name) {
    e.preventDefault();

    const {intro} = this.state;
    const {currentStep} = intro;

    const newStep = currentStep + 1;

    if (name) {
      this.onIntroStepUpdateHandler(newStep);
      router.transitionTo(`/intro/${newStep}`);
    } else {
      console.log(`Family name cannot be empty!`);
    }
  }

  onMembersUpdateHandler(status) {
    const {family} = this.state;

    if (status) {

      if (family.members.length >= 5) return;

      console.log(`Add member`);

      const familyMember = {
        id: family.members.length + 1,
        name: ``,
        avatar: `unknown`,
        languages: [],
        completed: false
      };

      familyMember.languages = family.languages;
      familyMember.name = family.members.length + 1;

      family.members.push(familyMember);

    } else {

      if (family.members.length <= 1) return;

      console.log(`Remove member`);
      family.members.pop();

    }

    this.setState({family});
  }

  render() {

    console.log(this.state);

    return (
      <Router>
        {({router}) => (

          <main>

            {this.setRouter(router)}

            <Match
              exactly pattern='/'
              component={Start}
            />

            <Match
              pattern='/intro/:id'
              render={({params}) => {

                const {id} = params;
                const stepExists = this.doesIntroStepExist(id);
                const {location, family, search} = this.state;

                if (stepExists) {
                  return (
                    <Intro
                      step={params.id}
                      family={family}
                      search={search}
                      location={location}
                      onIntroStepUpdate={newStep => this.onIntroStepUpdateHandler(newStep)}
                      onFamilyNameUpdate={familyName => this.onFamilyNameUpdateHandler(familyName)}
                      onFamilyNameSubmit={(e, name) => this.onFamilyNameSubmitHandler(e, name)}
                      onLocationSubmit={location => this.onLocationSubmitHandler(location)}
                      onSpokenLangUpdate={language => this.onSpokenLangUpdateHandler(language)}
                      onSearchLangUpdate={searchLanguage => this.onSearchLangUpdateHandler(searchLanguage)}
                      onMembersUpdate={status => this.onMembersUpdateHandler(status)}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Miss component={NoMatch} />

          </main>
        )}
      </Router>
    );
  }

}

export default App;
