import React, {PropTypes} from 'react';
import {Previous, Next} from '../../components';

const Members = ({step, changeIntroStep, familyName}) => {
  return (
    <div>
      <h2>How many of the {familyName} family are joining this session?</h2>
      <ul className='list-inline'>
        <li><Previous step={step} changeIntroStep={changeIntroStep} /></li>
        <li><Next step={step} changeIntroStep={changeIntroStep} /></li>
      </ul>
    </div>
  );
};

Members.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func,
  familyName: PropTypes.string
};

export default Members;
