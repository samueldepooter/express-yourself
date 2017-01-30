import React, {PropTypes} from 'react';

const Finish = ({id, onFinish}) => {
  return (
    <button className='btn btn-success' onClick={() => onFinish(id)}>Finish activity</button>
  );
};

Finish.propTypes = {
  id: PropTypes.number,
  onFinish: PropTypes.func
};

export default Finish;
