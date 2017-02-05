import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const FamilyMember = ({member, step, link}) => {
  const {id, name, avatar, completed} = member;

  if (!link) {
    return (
      <li className='member'>?</li>
    );
  } else {
    return (
      <li>
        <Link to={`/intro/${step}/members/${id}/edit/1`} className='member'>
          {renderCompleted(completed)}
          {renderAvatar(avatar)}
          <p className='name'>{name}</p>
        </Link>
      </li>
    );
  }
};

const renderAvatar = avatar => {
  if (avatar === `unknown`) {
    return <p className='avatar'>?</p>;
  } else {
    return <img src={`/assets/avatars/${avatar}.svg`} className='avatar avatarFound' />;
  }
};

const renderCompleted = completed => {
  if (completed) return (
    <div className='completed'>
      <img src='/assets/icons/check.svg' className='icon' />
      <span className='hide'>Completed!</span>
    </div>
  );
};

FamilyMember.propTypes = {
  member: PropTypes.object,
  step: PropTypes.number,
  link: PropTypes.bool
};

export default FamilyMember;
