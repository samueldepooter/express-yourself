import React, {PropTypes} from 'react';

import {Previous, Next} from '../../components';
import {languages} from '../../globals';

const SpokenLanguages = ({step, changeIntroStep, onSpokenLangChange, family, location, changeSearchLanguage, search}) => {
  return (
    <div>
      <h2>Which languages does the family speak?</h2>

      {spokenLanguages(family, onSpokenLangChange)}

      <form onSubmit={e => e.preventDefault()}>
        <h3>Most spoken languages</h3>

        {renderMostSpoken(location, family, onSpokenLangChange)}

        <div className='form-group'>
          <label htmlFor='languageSearch'>Search for a language</label>
          <input
            type='text'
            className='form-control'
            id='languageSearch'
            placeholder='Search for a language'
            ref={searchLanguage => this.searchLanguage = searchLanguage}
            onChange={() => changeSearchLanguage(this.searchLanguage.value)}
          />
          {renderSearch(search, family, onSpokenLangChange)}
        </div>

        <ul className='list-inline'>
          <li><Previous step={step} changeIntroStep={changeIntroStep} /></li>
          {renderNext(step, changeIntroStep, family)}
        </ul>
      </form>
    </div>
  );
};

const renderNext = (step, changeIntroStep, family) => {
  const {languages} = family;

  if (languages.length === 0) return;

  const word = languages.length === 1 ? `language` : `languages`;
  return <li><Next step={step} changeIntroStep={changeIntroStep} text={`${languages.length} ${word}, check!`} /></li>;
};

const checkFamilyLangs = (familyLanguages, language) => {
  const index = familyLanguages.indexOf(language);
  if (index > - 1) return true;
  return false;
};

const spokenLanguages = (family, onSpokenLangChange) => {
  const {languages: familyLanguages} = family;

  if (familyLanguages.length === 0) return <p>No languages added yet.</p>;

  return (
    <ul className='list-inline checkbox'>
      {familyLanguages.map((lang, i) => {
        return (
          <li key={i}>
            <label htmlFor={lang}>
              <input
                type='checkbox'
                checked={checkFamilyLangs(familyLanguages, lang)}
                value={lang}
                id={lang}
                onChange={() => onSpokenLangChange(lang)}
              />
              {lang}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

const renderMostSpoken = (location, family, onSpokenLangChange) => {

  if (location === `denied` || !location) return <p className='bg-warning'>Allow the location checker for this to work!</p>;

  const country = languages[location];
  const {languages: familyLanguages} = family;

  return (
    <ul>
      {country.map((language, i) => {
        return (
          <li className='checkbox' key={i}>
            <label htmlFor={language}>
              <input
                type='checkbox'
                checked={checkFamilyLangs(familyLanguages, language)}
                value={language}
                id={language}
                onChange={() => onSpokenLangChange(language)}
              />
              {language}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

const renderSearch = (found, family, onSpokenLangChange) => {
  const {languages: familyLanguages} = family;

  if (this.searchLanguage) {
    if (found.length === 0 && this.searchLanguage.value.length > 0) return <p>Nothing found</p>;
  }

  if (found.length === 0) return <p>Type something to search</p>;

  return (
    <div>
      {found.map((language, i) => {
        return (
          <div className='checkbox' key={i}>
            <label htmlFor={language}>
              <input
                type='checkbox'
                checked={checkFamilyLangs(familyLanguages, language)}
                value={language}
                id={language}
                onChange={() => onSpokenLangChange(language)}
              />
              {language}
            </label>
          </div>
        );
      })}
    </div>
  );
};

SpokenLanguages.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func,
  onSpokenLangChange: PropTypes.func,
  changeSearchLanguage: PropTypes.func,
  family: PropTypes.object,
  location: PropTypes.string,
  search: PropTypes.array
};

export default SpokenLanguages;
