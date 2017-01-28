import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const FamilyMember = ({member, step, link}) => {
  const {id, name, avatar, languages} = member;

  console.log(name, languages);

  if (!link) {
    return (
      <li>
        <img src={`../../../assets/avatar/${avatar}.svg`} />
      </li>
    );
  } else {
    return (
      <li>
        <Link to={`/intro/${step}/members/${id}`}>
          <img src={`../../../assets/avatar/${avatar}.svg`} />
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
