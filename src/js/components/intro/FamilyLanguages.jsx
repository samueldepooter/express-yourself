import React, {PropTypes} from 'react';

import {Previous, Next} from '../../components';
import {languages} from '../../globals';

const FamilyLanguages = ({step, changeIntroStep, onSpokenLangChange, family, location}) => {
  return (
    <div>
      <h2>Which languages does the family speak?</h2>

      {spokenLanguages(family)}

      <form>
        <h3>Most spoken languages</h3>

        {renderMostSpoken(location, family, onSpokenLangChange)}

        <ul className='list-inline'>
          <li><Previous step={step} changeIntroStep={changeIntroStep} /></li>
          {renderNext(step, changeIntroStep, family)}
        </ul>
      </form>
    </div>
  );
};

FamilyLanguages.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func,
  onSpokenLangChange: PropTypes.func,
  family: PropTypes.object,
  location: PropTypes.string
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

const spokenLanguages = family => {
  const {languages: familyLanguages} = family;

  if (familyLanguages.length === 0) return <p>No languages added yet.</p>;

  return (
    <ul className='list-inline'>
      {familyLanguages.map((lang, i) => <li key={i}><label htmlFor={lang}>{lang} (<span className='text-danger'>delete</span>)</label></li>)}
    </ul>
  );
};

const renderMostSpoken = (location, family, onSpokenLangChange) => {

  if (location === `denied` || !location) return <p className='bg-warning'>Allow the location checker for this to work!</p>;

  const country = languages[location];
  const {languages: familyLanguages} = family;

  return (
    <div>
      {country.map((language, i) => {
        return (
          <div className='checkbox' key={i}>
            <label htmlFor={language}>
              <input type='checkbox' checked={checkFamilyLangs(familyLanguages, language)} value={language} id={language} onChange={() => onSpokenLangChange(language)} />
              {language}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default FamilyLanguages;
