import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Deny = ({step, changeIntroStep, setLocation}) => {

  const nextStep = step + 1;

  return (
    <Link to={`/intro/${nextStep}`} className='btn btn-danger' onClick={() => {setLocation(false);changeIntroStep(nextStep);}}>Deny</Link>
  );
};

Deny.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func,
  setLocation: PropTypes.func
};

export default Deny;
