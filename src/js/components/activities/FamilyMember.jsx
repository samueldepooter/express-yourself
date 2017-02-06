import React, {PropTypes} from 'react';

const FamilyMember = ({member}) => {
  return (
    <li className='member'>
      <img src={`/assets/avatars/${member.avatar}.svg`} />
      <p className='hide'>{member.name}</p>
    </li>
  );
};

FamilyMember.propTypes = {
  member: PropTypes.object
};

export default FamilyMember;
