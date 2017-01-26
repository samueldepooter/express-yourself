import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Allow = ({step, changeIntroStep, checkLocation}) => {

  const nextStep = step + 1;

  return (
    <Link to={`/intro/${nextStep}`} className='btn btn-success' onClick={() => {checkLocation();changeIntroStep(nextStep);}}>Allow</Link>
  );
};

Allow.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func,
  checkLocation: PropTypes.func
};

export default Allow;
