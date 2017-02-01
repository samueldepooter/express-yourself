import React, {PropTypes} from 'react';

const ColorLanguages = ({players}) => {

  //only need 1 player in this game so will always be index 0
  const player = players[0];
  const {name, languages, avatar} = player;

  return (
    <section>
      <h3>Color your languages</h3>

      <ul className='list-unstyled'>
        {languages.map(((language, i) => <li key={i}>{language}</li>))}
      </ul>

      <div>
        <img src={`/assets/avatars/${avatar}.svg`} />
        <p>{name} is playing...</p>
      </div>
    </section>
  );
};

ColorLanguages.propTypes = {
  players: PropTypes.array
};

export default ColorLanguages;
