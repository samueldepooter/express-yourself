import React, {PropTypes} from 'react';

const Deny = ({step, onIntroStepUpdate, onLocationSubmit}) => {

  const nextStep = step + 1;

  return (
    <button
      className='btn btn-danger'
      onClick={() => {
        onLocationSubmit(nextStep, false);
        onIntroStepUpdate(nextStep);
      }}>
      Deny
    </button>
  );
};

Deny.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onLocationSubmit: PropTypes.func
};

export default Deny;
