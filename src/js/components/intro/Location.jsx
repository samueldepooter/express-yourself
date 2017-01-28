import React, {PropTypes} from 'react';
import {Previous, Deny, Allow} from '../../components';

const Location = ({step, onIntroStepUpdate, onLocationSubmit}) => {
  return (
    <div>

      <h2>Can we check your location?</h2>
      <p>This information is used to determine the most spoken languages in this region.</p>

      <ul className='list-inline'>
        <li>
          <Previous step={step} onIntroStepUpdate={onIntroStepUpdate} />
        </li>
        <li>
          <Deny step={step} onIntroStepUpdate={onIntroStepUpdate} onLocationSubmit={onLocationSubmit} />
        </li>
        <li>
          <Allow step={step} onIntroStepUpdate={onIntroStepUpdate} onLocationCheck={() => onLocationCheckHandler(onLocationSubmit)} />
        </li>
      </ul>

    </div>
  );
};

const onLocationCheckHandler = onLocationSubmit => {
  fetch(`https://ipinfo.io/json`)
    .then(response => response.json())
    .then(result => onLocationSubmit(result.country));
};

Location.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onLocationSubmit: PropTypes.func
};

export default Location;
