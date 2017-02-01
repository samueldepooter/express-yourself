import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Skip = ({id, step, text, onActivityStepUpdate}) => {

  if (!text) text = `Next`;
  const nextStep = step + 1;

  return (
    <Link
      to={`/activities/${id}/steps/${nextStep}`}
      className='btn btn-default'
      onClick={() => onActivityStepUpdate(nextStep)}
    >{text}</Link>
  );
};

Skip.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  text: PropTypes.string,
  onActivityStepUpdate: PropTypes.func
};

export default Skip;
