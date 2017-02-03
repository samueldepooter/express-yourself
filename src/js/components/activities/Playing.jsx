import React, {PropTypes} from 'react';

const Playing = ({player}) => {

  const {name, avatar} = player;

  return (
    <div>
      <img src={`/assets/avatars/${avatar}.svg`} />
      <p>{name} is playing...</p>
    </div>
  );
};

Playing.propTypes = {
  player: PropTypes.object
};

export default Playing;
