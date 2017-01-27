import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Deny = ({step, onIntroStepUpdate, onLocationSubmit}) => {

  const nextStep = step + 1;

  return (
    <Link
      to={`/intro/${nextStep}`}
      className='btn btn-danger'
      onClick={() => {
        onLocationSubmit(false);
        onIntroStepUpdate(nextStep);
      }}>
      Deny
    </Link>
  );
};

Deny.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onLocationSubmit: PropTypes.func
};

export default Deny;
