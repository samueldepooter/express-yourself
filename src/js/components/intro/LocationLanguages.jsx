import React, {PropTypes} from 'react';
import {languages} from '../../globals';

const LocationLanguages = ({location, family, onSpokenLangUpdate, checkLanguageSelected}) => {

  if (location === `denied` || !location) return <p className='bg-warning'>Allow the location checker for this to work!</p>;

  const country = languages[location];
  const {languages: familyLanguages} = family;
  const memberId = 0;

  return (
    <ul>
      {country.map((language, i) => {
        return (
          <li className='checkbox' key={i}>
            <label htmlFor={language}>
              <input
                type='checkbox'
                checked={checkLanguageSelected(familyLanguages, language)}
                value={language}
                id={language}
                onChange={() => onSpokenLangUpdate(memberId, `family`, language)}
              />
              {language}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

LocationLanguages.propTypes = {
  location: PropTypes.string,
  family: PropTypes.object,
  onSpokenLangUpdate: PropTypes.func,
  checkLanguageSelected: PropTypes.func
};

export default LocationLanguages;
