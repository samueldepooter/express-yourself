import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {avatars} from '../../globals';

const MemberAvatar = ({step, editStep, member, onMemberAvatarUpdate, onMemberNameUpdate, onMemberAgeUpdate}) => {

  const {id: memberId, avatar: selectedAvatar, name, age} = member;

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
          <label htmlFor='memberAge'>Your age: {age}</label>
          <input
            type='range'
            className='form-control'
            value={age}
            min='7'
            max='70'
            id='memberAge'
            ref={memberAge => this.memberAge = memberAge}
            onChange={() => onMemberAgeUpdate(memberId, this.memberAge.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='memberName' className='hide'>Your name</label>
          <input
            type='text'
            className='form-control'
            value={name}
            id='memberName'
            ref={memberName => this.memberName = memberName}
            placeholder='Your name'
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
  onMemberNameUpdate: PropTypes.func,
  onMemberAgeUpdate: PropTypes.func
};

export default MemberAvatar;
