import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Previous = ({step, changeIntroStep}) => {

  const previousStep = step - 1;

  return (
    <Link to={`/intro/${previousStep}`} className='btn btn-default' onClick={() => changeIntroStep(previousStep)}>Previous step</Link>
  );
};

Previous.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func
};

export default Previous;
