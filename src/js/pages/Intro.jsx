import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {settings, languages} from '../globals';

class Intro extends Component {

  state = {}

  renderStepBtn(type, step) {
    const {changeIntroStep, setLocation} = this.props;
    const {introSteps} = settings;

    const previousStep = step - 1;
    const nextStep = step + 1;

    if (type === 1) {
      if (!previousStep) return;

      return (
        <li>
          <Link to={`/intro/${previousStep}`} className='btn btn-default' onClick={() => changeIntroStep(previousStep)}>Previous step</Link>
        </li>
      );
    } else if (type === 2) {
      if (nextStep > introSteps) return;

      //bij stap 2 custom buttons om verder te gaan
      if (step === 2) {
        return (
          <ul className='list-inline'>
            <li><Link to={`/intro/${nextStep}`} className='btn btn-danger' onClick={() => {setLocation(`Not allowed`);changeIntroStep(nextStep);}}>Deny</Link></li>
            <li><Link to={`/intro/${nextStep}`} className='btn btn-success' onClick={() => {this.checkLocation();changeIntroStep(nextStep);}}>Allow</Link></li>
          </ul>
        );
      }

      return (
        <li>
          <Link to={`/intro/${nextStep}`} className='btn btn-default' onClick={() => changeIntroStep(nextStep)}>Next step</Link>
        </li>
      );
    }
  }

  checkLocation() {
    const {setLocation} = this.props;

    fetch(`https://ipinfo.io/json`)
      .then(response => response.json())
      .then(result => setLocation(result.country));
  }

  renderSpokenLanguages(location) {
    const country = languages[location];

    if (location === `Not allowed` || location === `Unknown`) return <p>Allow the location checker for this to work!</p>;

    return country.map((language, i) => {
      return <li key={i}>{language}</li>;
    });
  }

  renderStep(step) {
    step = parseInt(step);

    let {location} = this.props;
    if (!location) location = `Loading`;

    const localLocation = localStorage.getItem(`location`);
    if (localLocation) location = localLocation;

    switch (step) {

    case 1:
      return (
        <div>Fill in family name</div>
      );

    case 2:

      return (
        <div>
          <h2>Can we check your location?</h2>
        </div>
      );

    case 3:

      return (
        <div>
          <h2>Add family languages</h2>
          <p>Location: {location}</p>
          <ul>
            {this.renderSpokenLanguages(location)}
          </ul>
        </div>
      );

    case 4:
      return (
        <div>How many family members for this session?</div>
      );

    case 5:
      return (
        <div>Details for every family member</div>
      );
    }
  }

  render() {

    const {step} = this.props;
    const parsedStep = parseInt(step);

    return (
      <div>
        <h1>Intro: {step}</h1>
        {this.renderStep(step)}
        <ul className='list-inline'>
          {this.renderStepBtn(1, parsedStep)}
          {this.renderStepBtn(2, parsedStep)}
        </ul>
      </div>
    );
  }

}

Intro.propTypes = {
  step: PropTypes.string,
  changeIntroStep: PropTypes.func,
  setLocation: PropTypes.func,
  location: PropTypes.string
};

export default Intro;
