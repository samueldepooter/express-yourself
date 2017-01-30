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
          <Allow step={step} onIntroStepUpdate={onIntroStepUpdate} onLocationCheck={nextStep => onLocationCheckHandler(nextStep, onLocationSubmit)} />
        </li>
      </ul>

    </div>
  );
};

const onLocationCheckHandler = (nextStep, onLocationSubmit) => {
  console.log(`Fetching location`);

  const btn = document.querySelector(`.btn-success`);
  btn.innerHTML = `Fetching`;

  setTimeout(() => {
    fetch(`https://ipinfo.io/json`)
      .then(response => response.json())
      .then(result => onLocationSubmit(nextStep, result.country))
      .then(() => console.log(`Location found`))
      .catch(() => onLocationSubmit(nextStep, `denied`));
  }, 1000);
};

Location.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onLocationSubmit: PropTypes.func
};

export default Location;
