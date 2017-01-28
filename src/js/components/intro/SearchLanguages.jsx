import React, {PropTypes} from 'react';

const SearchLanguages = ({found, family, onSpokenLangUpdate, checkFamilyLangs}) => {
  const {languages: familyLanguages} = family;

  if (this.searchLanguage) {
    if (found.length === 0 && this.searchLanguage.value.length > 0) return <p>Nothing found</p>;
  }

  if (found.length === 0) return <p>Type something to search</p>;

  return (
    <ul>
      {found.map((language, i) => {
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

SearchLanguages.propTypes = {
  found: PropTypes.array,
  family: PropTypes.object,
  onSpokenLangUpdate: PropTypes.func,
  checkFamilyLangs: PropTypes.func
};

export default SearchLanguages;
