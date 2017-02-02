import React, {PropTypes} from 'react';

const CustomiseAvatar = ({id, step}) => {
  return (
    <div>CustomiseAvatar: activity {id} step {step}</div>
  );
};

CustomiseAvatar.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number
};

export default CustomiseAvatar;
