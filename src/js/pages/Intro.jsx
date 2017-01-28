import React, {PropTypes} from 'react';
import {FamilyName, Location, FamilyLanguages, FamilyMembers, FamilyDetails} from '../components';

const Intro = ({step, location, onFamilyNameUpdate, family, onIntroStepUpdate, onSpokenLangUpdate, onLocationSubmit, onSearchLangUpdate, search, onFamilyNameSubmit, onMembersUpdate}) => {

  step = parseInt(step);

  const localLocation = localStorage.getItem(`location`);
  if (localLocation) location = localLocation;

  switch (step) {

  case 1:
    return (
      <FamilyName
        step={step}
        familyName={family.name}
        onFamilyNameUpdate={onFamilyNameUpdate}
        onIntroStepUpdate={onIntroStepUpdate}
        onFamilyNameSubmit={onFamilyNameSubmit}
      />
    );

  case 2:
    return (
      <Location
        step={step}
        onIntroStepUpdate={onIntroStepUpdate}
        onLocationSubmit={location => onLocationSubmit(location)}
      />
    );

  case 3:
    return (
      <FamilyLanguages
        step={step}
        family={family}
        search={search}
        location={location}
        onSearchLangUpdate={searchLanguage => onSearchLangUpdate(searchLanguage)}
        onIntroStepUpdate={onIntroStepUpdate}
        onSpokenLangUpdate={language => onSpokenLangUpdate(language)}
      />
    );

  case 4:
    return (
      <FamilyMembers
        step={step}
        familyName={family.name}
        familyMembers={family.members}
        onIntroStepUpdate={onIntroStepUpdate}
        onMembersUpdate={onMembersUpdate}
      />
    );

  case 5:
    return (
      <FamilyDetails
        step={step}
        familyName={family.name}
        familyMembers={family.members}
        onIntroStepUpdate={onIntroStepUpdate}
      />
    );
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
  onMembersUpdate: PropTypes.func,
};

export default Intro;
