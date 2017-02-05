import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {SpokenLanguages, FoundLanguages} from '../../components';
import {languages as allLanguages} from '../../globals';

const MemberLanguages = ({step, member, search, onSpokenLangUpdate, onSearchLangUpdate, onMemberCompleted}) => {

  const {id: memberId, name, avatar, languages} = member;

  return (
    <div>
      <h2 className='hide'>{name}</h2>
      <img src={`/assets/avatars/${avatar}.svg`} />
      <p>{name} speaks...</p>

      <SpokenLanguages
        member={member}
        onSpokenLangUpdate={onSpokenLangUpdate}
        checkLanguageSelected={(memberLanguages, language) => checkLanguageSelected(memberLanguages, language)}
        checkFlag={language => checkFlag(language)}
      />

      <form onSubmit={e => e.preventDefault()}>
        <div className='form-group'>
          <label htmlFor='languageSearch'>Search for a language</label>
          <input
            type='search'
            className='form-control'
            id='languageSearch'
            placeholder='Search for a language'
            ref={searchLanguage => this.searchLanguage = searchLanguage}
            onChange={() => onSearchLangUpdate(this.searchLanguage.value)}
          />

          <FoundLanguages
            found={search}
            member={member}
            searchLanguage={checkSeachLanguage()}
            onSpokenLangUpdate={onSpokenLangUpdate}
            checkLanguageSelected={(familyLanguages, language) => checkLanguageSelected(familyLanguages, language)}
            checkFlag={language => checkFlag(language)}
          />

        </div>
      </form>

      {renderDone(step, memberId, languages, onMemberCompleted)}

    </div>
  );
};

const checkFlag = language => {
  const lang = allLanguages.all.find(l => l.name === language);

  let img = ``;
  if (lang.flag) img = lang.flag;
  else img = `global`;

  return <img src={`/assets/icons/flags/${img}.svg`} className='flag' />;
};

const renderDone = (step, memberId, languages, onMemberCompleted) => {

  if (languages.length === 0) return;

  return (
    <Link to={`/intro/${step}`} className='btn btn-default' onClick={() => onMemberCompleted(memberId)}>All done!</Link>
  );
};

const checkSeachLanguage = () => {
  if (this.searchLanguage) return this.searchLanguage.value;
};

const checkLanguageSelected = (languages, language) => {
  const index = languages.indexOf(language);
  if (index > - 1) return true;
  return false;
};

MemberLanguages.propTypes = {
  step: PropTypes.number,
  member: PropTypes.object,
  search: PropTypes.array,
  onSpokenLangUpdate: PropTypes.func,
  checkLanguageSelected: PropTypes.func,
  onSearchLangUpdate: PropTypes.func,
  onMemberCompleted: PropTypes.func
};

export default MemberLanguages;
