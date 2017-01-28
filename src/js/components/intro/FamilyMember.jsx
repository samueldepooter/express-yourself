import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const FamilyMember = ({member, step, link}) => {
  const {id, name, avatar} = member;

  if (!link) {
    return (
      <li>
        <img src={`/assets/avatars/${avatar}.svg`} />
      </li>
    );
  } else {
    return (
      <li>
        <Link to={`/intro/${step}/members/${id}/edit/1`}>
          <img src={`/assets/avatars/${avatar}.svg`} />
          <p>{name}</p>
        </Link>
      </li>
    );
  }
};

FamilyMember.propTypes = {
  member: PropTypes.object,
  step: PropTypes.number,
  link: PropTypes.bool
};

export default FamilyMember;
