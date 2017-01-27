import React, {PropTypes} from 'react';
import {FamilyName, Location, SpokenLanguages, Members, Details} from '../components';

const Intro = ({step, location, onFamilyNameUpdate, family, onIntroStepUpdate, onSpokenLangUpdate, onLocationSubmit, onSearchLangUpdate, search, onFamilyNameSubmit}) => {

  step = parseInt(step);

  const localLocation = localStorage.getItem(`location`);
  if (localLocation) location = localLocation;

  switch (step) {

  case 1:
    return (
      <FamilyName
        familyName={family.name}
        onFamilyNameUpdate={onFamilyNameUpdate}
        step={step}
        onIntroStepUpdate={onIntroStepUpdate}
        onFamilyNameSubmit={onFamilyNameSubmit}
      />
    );

  case 2:
    return <Location step={step} onIntroStepUpdate={onIntroStepUpdate} onLocationSubmit={location => onLocationSubmit(location)} />;

  case 3:
    return <SpokenLanguages step={step} search={search} onSearchLangUpdate={searchLanguage => onSearchLangUpdate(searchLanguage)} onIntroStepUpdate={onIntroStepUpdate} family={family} onSpokenLangUpdate={language => onSpokenLangUpdate(language)} location={location} />;

  case 4:
    return <Members step={step} onIntroStepUpdate={onIntroStepUpdate} familyName={family.name} />;

  case 5:
    return <Details step={step} onIntroStepUpdate={onIntroStepUpdate} familyName={family.name} />;
  }
};

Intro.propTypes = {
  step: PropTypes.string,
  location: PropTypes.string,
  family: PropTypes.object,
  search: PropTypes.array,
  onIntroStepUpdate: PropTypes.func,
  onFamilyNameUpdate: PropTypes.func,
  onFamilyNameSubmit: PropTypes.func,
  onLocationSubmit: PropTypes.func,
  onSpokenLangUpdate: PropTypes.func,
  onSearchLangUpdate: PropTypes.func,
};

export default Intro;
