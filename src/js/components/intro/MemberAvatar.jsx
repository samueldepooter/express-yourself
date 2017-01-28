import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {avatars} from '../../globals';

const MemberAvatar = ({step, member, onAvatarUpdate}) => {

  const {id: memberId, avatar: selectedAvatar} = member;

  return (
    <div>
      <img src={`/assets/avatars/${selectedAvatar}.svg`} />
      <ul className='list-inline'>
        {avatars.map((avatar, i) => {
          const {image} = avatar;
          return (
            <li className='checkbox' key={i}>
              <label htmlFor={image}>
                <input
                  type='radio'
                  name='avatar'
                  id={image}
                  checked={checkAvatar(image, selectedAvatar)}
                  onChange={() => onAvatarUpdate(memberId, image)}
                />
                <img src={`/assets/avatars/${image}.svg`} />
              </label>
            </li>
          );
        })}
      </ul>

      <Link
        to={`/intro/${step}`}
        className='btn btn-default'>
        To overview
      </Link>

    </div>
  );
};

const checkAvatar = (image, selectedAvatar) => {
  console.log(image, selectedAvatar);
  if (image === selectedAvatar) return true;
  return false;
};

MemberAvatar.propTypes = {
  step: PropTypes.number,
  member: PropTypes.object,
  onAvatarUpdate: PropTypes.func
};

export default MemberAvatar;
