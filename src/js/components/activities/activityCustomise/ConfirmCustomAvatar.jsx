import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ConfirmCustomAvatar = ({id, avatar, onCustomAvatarUpdate}) => {

  return (
    <Link
      to={`/activities/${id}/steps/2`}
      className='btn btn-default'
      onClick={() => onCustomAvatarUpdate(avatar)}
    >Confirm avatar</Link>
  );
};

ConfirmCustomAvatar.propTypes = {
  id: PropTypes.number,
  avatar: PropTypes.object,
  onCustomAvatarUpdate: PropTypes.func
};

export default ConfirmCustomAvatar;
