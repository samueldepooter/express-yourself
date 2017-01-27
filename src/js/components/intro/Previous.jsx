import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Previous = ({step, onIntroStepUpdate}) => {

  const previousStep = step - 1;

  return (
    <Link to={`/intro/${previousStep}`} className='btn btn-default' onClick={() => onIntroStepUpdate(previousStep)}>Previous step</Link>
  );
};

Previous.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func
};

export default Previous;
