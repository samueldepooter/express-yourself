import React, {PropTypes} from 'react';

import {Previous, Next, SearchLanguages, SpokenLanguages, LocationLanguages} from '../../components';

const FamilyLanguages = ({step, family, location, search, onIntroStepUpdate, onSpokenLangUpdate, onSearchLangUpdate}) => {
  return (
    <div>
      <h2>Which languages does the family speak?</h2>

      <SpokenLanguages
        family={family}
        onSpokenLangUpdate={onSpokenLangUpdate}
        checkFamilyLangs={(familyLanguages, language) => checkFamilyLangs(familyLanguages, language)}
      />

      <form onSubmit={e => e.preventDefault()}>
        <h3>Most spoken languages</h3>

        <LocationLanguages
          location={location}
          family={family}
          onSpokenLangUpdate={onSpokenLangUpdate}
          checkFamilyLangs={(familyLanguages, language) => checkFamilyLangs(familyLanguages, language)}
        />

        <div className='form-group'>
          <label htmlFor='languageSearch'>Search for a language</label>
          <input
            type='text'
            className='form-control'
            id='languageSearch'
            placeholder='Search for a language'
            ref={searchLanguage => this.searchLanguage = searchLanguage}
            onChange={() => onSearchLangUpdate(this.searchLanguage.value)}
          />

          <SearchLanguages
            found={search}
            family={family}
            onSpokenLangUpdate={onSpokenLangUpdate}
            checkFamilyLangs={(familyLanguages, language) => checkFamilyLangs(familyLanguages, language)}
          />

        </div>

        <ul className='list-inline'>

          <li>
            <Previous step={step} onIntroStepUpdate={onIntroStepUpdate} />
          </li>

          {renderNext(step, onIntroStepUpdate, family)}

        </ul>
      </form>
    </div>
  );
};

const renderNext = (step, onIntroStepUpdate, family) => {
  const {languages} = family;

  if (languages.length === 0) return;

  const word = languages.length === 1 ? `language` : `languages`;
  return <li><Next step={step} onIntroStepUpdate={onIntroStepUpdate} text={`${languages.length} ${word}, check!`} /></li>;
};

const checkFamilyLangs = (familyLanguages, language) => {
  const index = familyLanguages.indexOf(language);
  if (index > - 1) return true;
  return false;
};

FamilyLanguages.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onSpokenLangUpdate: PropTypes.func,
  onSearchLangUpdate: PropTypes.func,
  family: PropTypes.object,
  location: PropTypes.string,
  search: PropTypes.array
};

export default FamilyLanguages;