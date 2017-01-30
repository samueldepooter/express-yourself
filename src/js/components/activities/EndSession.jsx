import React, {PropTypes} from 'react';

const EndSession = ({onConfirmation}) => {
  return (
    <button className='btn btn-danger' onClick={() => onConfirmation(true)}>Complete session</button>
  );
};

EndSession.propTypes = {
  onConfirmation: PropTypes.func
};

export default EndSession;
