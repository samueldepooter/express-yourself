import React, {PropTypes} from 'react';
import {Previous, Deny, Allow} from '../../components';

const CheckLocation = ({step, changeIntroStep, setLocation}) => {
  return (
    <div>
      <h1>Can we check your location?</h1>
      <p>This information is used to determine the most spoken languages in this region.</p>
      <ul className='list-inline'>
        <li><Previous step={step} changeIntroStep={changeIntroStep} /></li>
        <li><Deny step={step} changeIntroStep={changeIntroStep} setLocation={setLocation} /></li>
        <li><Allow step={step} changeIntroStep={changeIntroStep} checkLocation={() => checkLocation(setLocation)} /></li>
      </ul>
    </div>
  );
};

CheckLocation.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func,
  setLocation: PropTypes.func
};

const checkLocation = setLocation => {

  fetch(`https://ipinfo.io/json`)
    .then(response => response.json())
    .then(result => setLocation(result.country));
};

export default CheckLocation;
