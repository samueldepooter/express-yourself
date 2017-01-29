import React, {PropTypes} from 'react';

const Allow = ({step, onIntroStepUpdate, onLocationCheck}) => {

  const nextStep = step + 1;

  return (
    <button
      className='btn btn-success'
      onClick={() => {
        onLocationCheck(nextStep);
        onIntroStepUpdate(nextStep);
      }}>
      Allow
    </button>
  );
};

Allow.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onLocationCheck: PropTypes.func
};

export default Allow;
