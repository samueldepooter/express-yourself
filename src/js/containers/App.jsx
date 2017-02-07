import React, {Component} from 'react';
import {Match, BrowserRouter as Router, Miss, Redirect} from 'react-router';
import IO from 'socket.io-client';

import {Start, Intro, Activities, Activity, Details, NoMatch} from '../pages';
import {Page1} from '../pages';
import {settings, languages, activitiesData} from '../globals';

let router = {};

class App extends Component {

  state = {
    intro: {
      currentStep: 1,
      maxStep: 1
    },
    activity: {
      currentStep: 1,
      playerIds: []
    },
    location: ``,
    family: {
      name: ``,
      languages: [],
      members: []
    },
    search: [],
    activities: {
      confirmation: false,
      active: 0,
      completed: []
    }
  }

  setRouter(r) {
    router = r;
  }

  initSocket() {
    this.socket = IO(`/`);
  }

  componentWillMount() {

    this.initSocket();

    //check everything that's stored in local storage
    //this.checkLocalStorageData();

    if (settings.development) {
      this.addMember();
    }
  }

  addMember() {
    const {family} = this.state;

    const member1 = {
      id: 1,
      name: `Samuel`,
      avatar: `lion`,
      languages: [`Dutch`, `French`],
      age: `21`,
      completed: false
    };

    const member2 = {
      id: 2,
      name: `Emiel`,
      avatar: `pig`,
      languages: [`Dutch`],
      age: `22`,
      completed: false
    };

    const name = `De Pooter`;

    family.name = name;
    family.members = [member1, member2];

    this.setState({family});
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
    const {intro} = this.state;
    const {currentStep} = intro;

    if (id > totalIntroSteps || id > currentStep || isNaN(id)) return false;
    else return true;

  }

  onIntroStepUpdateHandler(newStep) {
    const {intro} = this.state;
    const {maxStep} = intro;

    intro.currentStep = newStep;

    if (maxStep < newStep) intro.maxStep = newStep;

    const newSearch = [];

    this.setState({intro, search: newSearch});
  }

  onLocationSubmitHandler(nextStep, location) {
    if (!location) location = `denied`;
    this.setState({location});
    router.transitionTo(`/intro/${nextStep}`);
  }

  onSpokenLangUpdateHandler(memberId, type, language) {

    const {family} = this.state;

    if (type === `family`) {

      const {languages: familyLanguages} = family;

      const index = familyLanguages.indexOf(language);

      if (index >= 0) familyLanguages.splice(index, 1);
      else familyLanguages.push(language);

    } else if (type === `member`) {

      const member = this.findMember(memberId);

      const index = member.languages.indexOf(language);

      if (index >= 0) member.languages.splice(index, 1);
      else member.languages.push(language);

    }

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

    const {maxLanguageResults} = settings;
    const filtered = found.slice(0, maxLanguageResults);

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
    const {maxPlayers} = settings;

    //take copy of original array
    const familyLanguages = family.languages.slice();

    if (status) {

      if (family.members.length >= maxPlayers) return;

      const familyMember = {
        id: family.members.length + 1,
        name: ``,
        avatar: `unknown`,
        age: `7`,
        languages: familyLanguages,
        completed: false
      };

      family.members.push(familyMember);

    } else {
      if (family.members.length <= 1) return;
      family.members.pop();
    }

    this.setState({family});
  }

  onMemberAvatarUpdateHandler(memberId, avatar) {
    const {family} = this.state;

    //member with id 1 id is 0 in the state
    const stateId = memberId - 1;

    family.members[stateId].avatar = avatar;

    this.setState({family});
  }

  findMember(memberId) {
    const {family} = this.state;
    const {members} = family;

    const member = members.filter(member => member.id === memberId);
    if (member[0]) return member[0];
    return false;
  }

  onMemberNameUpdateHandler(memberId, name) {
    const {family} = this.state;

    //member with id 1 id is 0 in the state
    const stateId = memberId - 1;
    family.members[stateId].name = name;

    this.setState({family});
  }

  onMemberAgeUpdateHandler(memberId, age) {
    const {family} = this.state;

    const stateId = memberId - 1;
    family.members[stateId].age = age;

    this.setState({family});
  }

  onMemberCompletedHandler(id) {
    const {family} = this.state;
    const member = this.findMember(id);
    member.completed = true;
    const newSearch = [];
    this.setState({family, search: newSearch});
  }

  onIntroCompletedHandler() {
    const {family} = this.state;

    //no members -> intro not completed
    if (family.members.length <= 0) return false;

    //check if profiles are completed
    const done = family.members.map(member => {
      return member.completed ? true : false;
    });

    if (done.indexOf(false) >= 0) return false;
    return true;
  }

  onConfirmationHandler(state) {
    const {activities} = this.state;

    if (state) activities.confirmation = true;
    else activities.confirmation = false;

    this.setState({activities});
  }

  onSetActiveHandler(id) {
    const {activities, activity} = this.state;

    activities.active = id;
    activity.currentStep = 1;

    this.setState({activities});
  }

  onRedirectHandler(url) {
    router.transitionTo(url);
  }

  onFinishHandler(id) {
    const {activities} = this.state;
    const completed = activities.completed.slice();

    const alreadyCompleted = completed.indexOf(id);

    //< 0 means it's not in the array yet -> push it
    if (alreadyCompleted < 0) {
      completed.push(id);
      activities.completed = completed;

      this.setState({activities});
    }

    router.transitionTo(`/activities`);
  }

  findActivity(id) {
    const activity = activitiesData[id];
    if (activity) return activity;
  }

  onActivityStepUpdateHandler(newStep) {
    const {activity} = this.state;

    activity.currentStep = newStep;
    this.setState({activity});
  }

  onPlayersSubmitHandler(id, step, playerIds) {
    const {activity} = this.state;
    const {playerIds: oldIds} = activity;

    let ids = oldIds.slice();
    ids = playerIds;

    activity.playerIds = ids;

    this.setState({activity});

    this.onActivityStepUpdateHandler(step + 1);
    this.onRedirectHandler(`/activities/${id}/steps/${step + 1}`);
  }

  findPlayers(playerIds) {
    const {family} = this.state;
    const {members} = family;

    const players = [];

    members.map((member, i) => {
      playerIds.map(id => {
        id = parseInt(id);
        if (i === id) players.push(member);
      });
    });

    return players;
  }

  onLanguagesUpdateHandler(convertedLanguages) {
    const {family} = this.state;

    const member = this.getPlayer(0);
    member.languages = convertedLanguages;

    this.setState({family});
  }

  getPlayer(n) {
    const {family, activity} = this.state;
    const {members} = family;
    const {playerIds} = activity;

    return members[playerIds[n]];
  }

  getLanguage(memberId, language) {
    const player = this.getPlayer(memberId);
    const {languages} = player;

    const foundLanguage = languages.find(l => l.language === language);
    return foundLanguage;
  }

  onLanguageColorUpdateHandler(language, color) {
    const {family} = this.state;

    const oldLanguage = this.getLanguage(0, language);
    oldLanguage.color = color;

    this.setState({family});
  }

  onCustomAvatarUpdateHandler(avatar) {
    //find right member, add custom avatar
    const {activity} = this.state;
    const {playerIds} = activity;

    let memberId = playerIds[0];
    memberId = parseInt(memberId);
    const member = this.findMember(memberId + 1);

    member.customAvatar = avatar;

    this.setState({activity});
  }

  render() {

    console.log(this.state);
    const {location, family, search, activities, activity} = this.state;

    return (
      <Router>
        {({router}) => (

          <main>

            {this.setRouter(router)}

            <div className='overlay error'>
              <p className='text'>Please use a <span className='bold'>tablet</span> and put it in <span className='bold'>landscape view</span>!</p>
            </div>

            <header className='hide'>
              <h1>Express yourself!</h1>
            </header>

            <Match
              exactly pattern='/'
              component={Start}
            />

            <Match
              exactly pattern='/intro/:id'
              render={({params}) => {

                let {id} = params;
                id = parseInt(id);

                let stepExists = this.doesIntroStepExist(id);
                if (settings.development) stepExists = true;

                if (stepExists) {
                  return (
                    <Intro
                      step={id}
                      family={family}
                      search={search}
                      location={location}
                      onIntroStepUpdate={newStep => this.onIntroStepUpdateHandler(newStep)}
                      onFamilyNameUpdate={familyName => this.onFamilyNameUpdateHandler(familyName)}
                      onFamilyNameSubmit={(e, name) => this.onFamilyNameSubmitHandler(e, name)}
                      onLocationSubmit={(nextStep, location) => this.onLocationSubmitHandler(nextStep, location)}
                      onSpokenLangUpdate={(memberId, type, language) => this.onSpokenLangUpdateHandler(memberId, type, language)}
                      onSearchLangUpdate={searchLanguage => this.onSearchLangUpdateHandler(searchLanguage)}
                      onMembersUpdate={status => this.onMembersUpdateHandler(status)}
                      onIntroCompleted={() => this.onIntroCompletedHandler()}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/intro/:id/members/:memberId/edit/:editId'
              render={({params}) => {

                let {id, memberId, editId} = params;

                id = parseInt(id);
                memberId = parseInt(memberId);
                editId = parseInt(editId);

                const member = this.findMember(memberId);
                const stepExists = this.doesIntroStepExist(id);

                if (stepExists && id === settings.totalIntroSteps && member) {
                  return (
                    <Intro
                      step={id}
                      editStep={editId}
                      member={member}
                      search={search}
                      onMemberAvatarUpdate={(memberId, avatar) => this.onMemberAvatarUpdateHandler(memberId, avatar)}
                      onMemberNameUpdate={(memberId, name) => this.onMemberNameUpdateHandler(memberId, name)}
                      onSearchLangUpdate={searchLanguage => this.onSearchLangUpdateHandler(searchLanguage)}
                      onSpokenLangUpdate={(memberId, type, language) => this.onSpokenLangUpdateHandler(memberId, type, language)}
                      onMemberCompleted={id => this.onMemberCompletedHandler(id)}
                      onMemberAgeUpdate={(memberId, age) => this.onMemberAgeUpdateHandler(memberId, age)}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/activities'
              render={() => {

                const {confirmation, completed} = activities;

                let done = this.onIntroCompletedHandler();
                if (settings.development) done = true;

                if (done) {
                  return (
                    <Activities
                      family={family}
                      confirmation={confirmation}
                      completed={completed}
                      onConfirmation={state => this.onConfirmationHandler(state)}
                      onRedirect={url => this.onRedirectHandler(url)}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/activities/:id/details'
              render={({params}) => {
                let {id} = params;
                const {confirmation, completed} = activities;

                id = parseInt(id);

                let done = this.onIntroCompletedHandler();
                if (settings.development) done = true;

                if (done) {
                  return (
                    <Details
                      id={id}
                      family={family}
                      confirmation={confirmation}
                      completed={completed}
                      onConfirmation={state => this.onConfirmationHandler(state)}
                      onRedirect={url => this.onRedirectHandler(url)}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/activities/:id/steps/:stepId'
              render={({params}) => {

                let {id, stepId} = params;
                id = parseInt(id);
                stepId = parseInt(stepId);

                const {confirmation} = activities;
                const {playerIds} = activity;
                const {members} = family;

                const activityDetails = this.findActivity(id - 1);
                const players = this.findPlayers(playerIds);

                const {steps} = activitiesData[id - 1];

                let done = this.onIntroCompletedHandler();
                if (settings.development) done = true;

                if (done) {
                  //activity exists
                  //the step in state = step you're browsing to (so you can't go to later steps)
                  //stepId has to be lower or equal to the total steps of that activity
                  if (activityDetails && activity.currentStep >= stepId && stepId <= steps) {
                    return (
                      <Activity
                        id={id}
                        activity={activityDetails}
                        step={stepId}
                        members={members}
                        confirmation={confirmation}
                        players={players}
                        onConfirmation={state => this.onConfirmationHandler(state)}
                        onSetActive={id => this.onSetActiveHandler(id)}
                        onRedirect={url => this.onRedirectHandler(url)}
                        onPlayersSubmit={(id, step, playerIds) => this.onPlayersSubmitHandler(id, step, playerIds)}
                        onFinish={id => this.onFinishHandler(id)}
                        onActivityStepUpdate={newStep => this.onActivityStepUpdateHandler(newStep)}
                        onLanguagesUpdate={languages => this.onLanguagesUpdateHandler(languages)}
                        onLanguageColorUpdate={(language, color) => this.onLanguageColorUpdateHandler(language, color)}
                        onCustomAvatarUpdate={avatar => this.onCustomAvatarUpdateHandler(avatar)}
                      />
                    );
                  } else {
                    return <Redirect to='/activities' />;
                  }
                } else {
                  return <Redirect to='/activities' />;
                }
              }}
            />

            <Match
              exactly pattern='/test/1'
              render={() => <Page1 />}
            />

            <Miss component={NoMatch} />

          </main>
        )}
      </Router>
    );
  }

}

export default App;
