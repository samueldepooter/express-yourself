import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Next = ({step, changeIntroStep, text}) => {
  text = text || `Next step`;

  const nextStep = step + 1;

  return (
    <Link to={`/intro/${nextStep}`} className='btn btn-default' onClick={() => changeIntroStep(nextStep)}>{text}</Link>
  );
};

Next.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func,
  text: PropTypes.string
};

export default Next;
