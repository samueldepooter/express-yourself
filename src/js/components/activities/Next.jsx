import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Next = ({id, step, icon, text, onActivityStepUpdate}) => {

  if (!text) text = `Next`;
  if (!icon) icon = `check`;
  const nextStep = step + 1;

  return (
    <Link
      to={`/activities/${id}/steps/${nextStep}`}
      className='btn'
      onClick={() => onActivityStepUpdate(nextStep)}>
      <img className='icon' src={`/assets/icons/${icon}.svg`} />
      <span className='text'>{text}</span>
    </Link>
  );
};

Next.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  icon: PropTypes.string,
  text: PropTypes.string,
  onActivityStepUpdate: PropTypes.func
};

export default Next;
