import React, {PropTypes} from 'react';

const FoundLanguages = ({found, family, member, searchLanguage, onSpokenLangUpdate, checkLanguageSelected}) => {

  let languages = [];
  let spokenLangUpdate = ``;

  let memberId = 0;

  if (family) {
    languages = family.languages;
    spokenLangUpdate = `family`;
  } else if (member) {
    memberId = member.id;
    languages = member.languages;
    spokenLangUpdate = `member`;
  }

  if (searchLanguage) {
    if (found.length === 0 && searchLanguage.length > 0) return <p>Nothing found</p>;
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
                checked={checkLanguageSelected(languages, language)}
                value={language}
                id={language}
                onChange={() => onSpokenLangUpdate(memberId, spokenLangUpdate, language)}
              />
              {language}

            </label>
          </li>
        );
      })}
    </ul>
  );
};

FoundLanguages.propTypes = {
  found: PropTypes.array,
  family: PropTypes.object,
  member: PropTypes.object,
  searchLanguage: PropTypes.string,
  onSpokenLangUpdate: PropTypes.func,
  checkLanguageSelected: PropTypes.func
};

export default FoundLanguages;
