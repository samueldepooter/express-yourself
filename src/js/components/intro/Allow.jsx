import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Allow = ({step, onIntroStepUpdate, onLocationCheck}) => {

  const nextStep = step + 1;

  return (
    <Link
      to={`/intro/${nextStep}`}
      className='btn btn-success'
      onClick={() => {
        onLocationCheck();
        onIntroStepUpdate(nextStep);
      }}>
      Allow
    </Link>
  );
};

Allow.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onLocationCheck: PropTypes.func
};

export default Allow;
