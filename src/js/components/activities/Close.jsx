import React, {PropTypes} from 'react';

const Close = ({onConfirmation}) => {

  return (
    <button className='btn btn-danger' onClick={() => onConfirmation(true)}>Close</button>
  );
};

Close.propTypes = {
  onConfirmation: PropTypes.func
};

export default Close;
