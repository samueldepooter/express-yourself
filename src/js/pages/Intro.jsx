import React, {PropTypes} from 'react';
import {FamilyName, Location, FamilyLanguages, FamilyMembers, FamilyDetails, MemberAvatar, MemberLanguages} from '../components';

const Intro = ({
  step,
  location,
  family,
  member,
  editStep,
  onMemberAvatarUpdate,
  onMemberNameUpdate,
  onIntroStepUpdate,
  onFamilyNameUpdate,
  onSpokenLangUpdate,
  onLocationSubmit,
  onSearchLangUpdate,
  search,
  onFamilyNameSubmit,
  onMembersUpdate,
  onMemberCompleted
}) => {

  const localLocation = localStorage.getItem(`location`);
  if (localLocation) location = localLocation;

  //check if member (details) is in the props, if not then it's not on the edit page
  if (member) {

    switch (editStep) {

    case 1:
      return (
        <MemberAvatar
          step={step}
          editStep={editStep}
          member={member}
          onMemberAvatarUpdate={onMemberAvatarUpdate}
          onMemberNameUpdate={onMemberNameUpdate}
        />
      );

    case 2:
      return (
        <MemberLanguages
          step={step}
          member={member}
          search={search}
          onSearchLangUpdate={searchLanguage => onSearchLangUpdate(searchLanguage)}
          onSpokenLangUpdate={(memberId, type, language) => onSpokenLangUpdate(memberId, type, language)}
          onMemberCompleted={id => onMemberCompleted(id)}
        />
      );
    }

  } else {
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
          onSpokenLangUpdate={(memberId, type, language) => onSpokenLangUpdate(memberId, type, language)}
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
  }
};

Intro.propTypes = {
  step: PropTypes.number,
  editStep: PropTypes.number,
  location: PropTypes.string,
  family: PropTypes.object,
  search: PropTypes.array,
  member: PropTypes.object,
  onIntroStepUpdate: PropTypes.func,
  onFamilyNameUpdate: PropTypes.func,
  onFamilyNameSubmit: PropTypes.func,
  onLocationSubmit: PropTypes.func,
  onSpokenLangUpdate: PropTypes.func,
  onSearchLangUpdate: PropTypes.func,
  onMembersUpdate: PropTypes.func,
  onMemberAvatarUpdate: PropTypes.func,
  onMemberNameUpdate: PropTypes.func,
  onMemberCompleted: PropTypes.func
};

export default Intro;
