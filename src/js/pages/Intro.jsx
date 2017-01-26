import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {settings} from '../globals';

class Intro extends Component {

  state = {}

  renderStepBtn(type, step) {
    const {changeIntroStep} = this.props;
    const {introSteps} = settings;

    const previousStep = step - 1;
    const nextStep = step + 1;

    if (type === 1) {
      if (!previousStep) return;

      return (
        <li>
          <Link to={`/intro/${previousStep}`} className='btn btn-default' onClick={() => {changeIntroStep(previousStep);}}>Previous step</Link>
        </li>
      );
    } else if (type === 2) {
      if (nextStep > introSteps) return;

      return (
        <li>
          <Link to={`/intro/${nextStep}`} className='btn btn-default' onClick={() => {changeIntroStep(nextStep);}}>Next step</Link>
        </li>
      );
    }
  }

  render() {

    const {step} = this.props;
    const parsedStep = parseInt(step);

    return (
      <div>
        <h1>Intro: {step}</h1>
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
  changeIntroStep: PropTypes.func
};

export default Intro;
