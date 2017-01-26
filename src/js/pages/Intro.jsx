import React, {PropTypes} from 'react';
import {FamilyName, Location, SpokenLanguages, Members, Details} from '../components';

const Intro = ({step, location, updateFamilyName, family, changeIntroStep, onSpokenLangChange, setLocation}) => {

  step = parseInt(step);

  const localLocation = localStorage.getItem(`location`);
  if (localLocation) location = localLocation;

  switch (step) {

  case 1:
    return <FamilyName familyName={family.name} updateFamilyName={updateFamilyName} step={step} changeIntroStep={changeIntroStep} />;

  case 2:
    return <Location step={step} changeIntroStep={changeIntroStep} setLocation={location => setLocation(location)} />;

  case 3:
    return <SpokenLanguages step={step} changeIntroStep={changeIntroStep} family={family} onSpokenLangChange={language => onSpokenLangChange(language)} location={location} />;

  case 4:
    return <Members step={step} changeIntroStep={changeIntroStep} familyName={family.name} />;

  case 5:
    return <Details step={step} changeIntroStep={changeIntroStep} familyName={family.name} />;
  }
};

Intro.propTypes = {
  step: PropTypes.string,
  changeIntroStep: PropTypes.func,
  onSpokenLangChange: PropTypes.func,
  updateFamilyName: PropTypes.func,
  setLocation: PropTypes.func,
  location: PropTypes.string,
  family: PropTypes.object
};

export default Intro;
