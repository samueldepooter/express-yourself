import React, {PropTypes} from 'react';
import {Previous} from '../../components';

const Details = ({step, changeIntroStep, familyName}) => {
  return (
    <div>
      <h2>The {familyName} family</h2>
      <p>Tap on a family member to fill in the details</p>
      <ul className='list-inline'>
        <li><Previous step={step} changeIntroStep={changeIntroStep} /></li>
      </ul>
    </div>
  );
};

Details.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func,
  familyName: PropTypes.string
};

export default Details;
