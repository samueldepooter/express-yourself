import React, {PropTypes} from 'react';
import {languages} from '../../globals';

const LocationLanguages = ({location, family, onSpokenLangUpdate, checkFamilyLangs}) => {

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
                onChange={() => onSpokenLangUpdate(language)}
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
  checkFamilyLangs: PropTypes.func
};

export default LocationLanguages;
