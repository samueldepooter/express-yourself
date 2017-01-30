import React, {PropTypes} from 'react';

const FamilyMember = ({member}) => {
  return (
    <li>
      <img src={`/assets/avatars/${member.avatar}.svg`} />
      <p>{member.name}</p>
    </li>
  );
};

FamilyMember.propTypes = {
  member: PropTypes.object
};

export default FamilyMember;
