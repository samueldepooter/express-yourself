import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {avatars} from '../../globals';

const MemberAvatar = ({step, editStep, member, onMemberAvatarUpdate, onMemberNameUpdate}) => {

  const {id: memberId, avatar: selectedAvatar, name} = member;

  return (
    <div>
      <h2>Choose your avatar and give it your name!</h2>

      <img src={`/assets/avatars/${selectedAvatar}.svg`} />


      <form onSubmit={e => e.preventDefault()}>
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
                    onChange={() => onMemberAvatarUpdate(memberId, image)}
                  />
                  <img src={`/assets/avatars/${image}.svg`} />
                </label>
              </li>
            );
          })}
        </ul>

        <div className='form-group'>
          <label htmlFor='familyName'>My name is</label>
          <input
            type='text'
            className='form-control'
            value={name}
            id='familyName'
            ref={memberName => this.memberName = memberName}
            placeholder='Samuel'
            onChange={() => onMemberNameUpdate(memberId, this.memberName.value)}
          />
        </div>
      </form>

      {renderContinueBtn(name, selectedAvatar, step, memberId, editStep)}

    </div>
  );
};

const renderContinueBtn = (name, selectedAvatar, step, memberId, editStep) => {
  if (selectedAvatar !== `unknown` && name) {
    return (
      <Link
        to={`/intro/${step}/members/${memberId}/edit/${editStep + 1}`}
        className='btn btn-default'>
        {name} {checkSound(selectedAvatar)}!
      </Link>
    );
  }
};

const checkSound = selectedAvatar => {
  const found = avatars.filter(avatar => avatar.image === selectedAvatar);

  if (found[0]) return found[0].sound;
  else return `yells`;
};

const checkAvatar = (image, selectedAvatar) => {
  if (image === selectedAvatar) return true;
  return false;
};

MemberAvatar.propTypes = {
  step: PropTypes.number,
  editStep: PropTypes.number,
  member: PropTypes.object,
  onMemberAvatarUpdate: PropTypes.func,
  onMemberNameUpdate: PropTypes.func
};

export default MemberAvatar;
