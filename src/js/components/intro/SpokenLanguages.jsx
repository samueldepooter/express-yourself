import React, {PropTypes} from 'react';

const SpokenLanguages = ({family, member, onSpokenLangUpdate, checkLanguageSelected}) => {

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

  if (languages.length === 0) return <p>No languages added yet.</p>;

  return (
    <ul className='list-inline checkbox'>
      {languages.map((lang, i) => {
        return (
          <li key={i}>
            <label htmlFor={lang}>
              <input
                type='checkbox'
                checked={checkLanguageSelected(languages, lang)}
                value={lang}
                id={lang}
                onChange={() => onSpokenLangUpdate(memberId, spokenLangUpdate, lang)}
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
  member: PropTypes.object,
  onSpokenLangUpdate: PropTypes.func,
  checkLanguageSelected: PropTypes.func
};

export default SpokenLanguages;
