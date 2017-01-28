import React, {PropTypes} from 'react';

const SpokenLanguages = ({family, onSpokenLangUpdate, checkFamilyLangs}) => {

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
                onChange={() => onSpokenLangUpdate(lang)}
              />
              {lang}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

SpokenLanguages.propTypes = {
  family: PropTypes.object,
  onSpokenLangUpdate: PropTypes.func,
  checkFamilyLangs: PropTypes.func
};

export default SpokenLanguages;
