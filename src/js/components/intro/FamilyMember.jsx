import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const FamilyMember = ({member, step, link}) => {
  const {id, name, avatar, completed} = member;

  if (!link) {
    return (
      <li className='unknown'>?</li>
    );
  } else {
    return (
      <li>
        <Link to={`/intro/${step}/members/${id}/edit/1`}>
          <img src={`/assets/avatars/${avatar}.svg`} />
          {renderName(name, completed)}
        </Link>
      </li>
    );
  }
};

const renderName = (name, completed) => {

  const img = `https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-128.png`;

  return completed ? (
    <p><img src={img} className='checked' /> {name}</p>
  ) : (
    <p>{name}</p>
  );
};

FamilyMember.propTypes = {
  member: PropTypes.object,
  step: PropTypes.number,
  link: PropTypes.bool
};

export default FamilyMember;
