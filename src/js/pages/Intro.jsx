import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {settings} from '../globals';

class Intro extends Component {

  state = {}

  renderStep(type, step) {
    const {changeIntroStep} = this.props;
    const {introSteps} = settings;

    const previousStep = step - 1;
    const nextStep = step + 1;

    if (type === 1) {
      if (!previousStep) return;

      return (
        <Link to={`/intro/${previousStep}`} onClick={() => {changeIntroStep(previousStep);}}>Previous step</Link>
      );
    } else if (type === 2) {
      if (nextStep > introSteps) return;

      return (
        <Link to={`/intro/${nextStep}`} onClick={() => {changeIntroStep(nextStep);}}>Next step</Link>
      );
    }
  }

  render() {

    const {step} = this.props;
    const parsedStep = parseInt(step);

    return (
      <div>
        <p>Intro: {step}</p>
        {this.renderStep(1, parsedStep)}
        {this.renderStep(2, parsedStep)}
      </div>
    );
  }

}

Intro.propTypes = {
  step: PropTypes.string,
  changeIntroStep: PropTypes.func
};

export default Intro;
