import React, {PropTypes} from 'react';
import {ExplanationVideo, PickPlayers, ColorLanguages} from './';

const Customise = ({id, step, members, players, activity, onFinish, onActivityStepUpdate, onPlayersSubmit, onLanguagesUpdate, onLanguageColorUpdate}) => {

  switch (step) {
  case 1:
    return (
      <ExplanationVideo
        id={id}
        step={step}
        activity={activity}
        onActivityStepUpdate={onActivityStepUpdate}
      />
    );

  case 2:
    return (
      <PickPlayers
        id={id}
        step={step}
        members={members}
        numberOfPlayers={1}
        onFinish={onFinish}
        onPlayersSubmit={onPlayersSubmit}
      />
    );

  case 3:
    return (
      <ColorLanguages
        id={id}
        step={step}
        activityName={activity.name}
        players={players}
        onLanguagesUpdate={onLanguagesUpdate}
        onLanguageColorUpdate={onLanguageColorUpdate}
        onActivityStepUpdate={onActivityStepUpdate}
      />
    );

  }
};

Customise.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  members: PropTypes.array,
  players: PropTypes.array,
  activity: PropTypes.object,
  onFinish: PropTypes.func,
  onActivityStepUpdate: PropTypes.func,
  onPlayersSubmit: PropTypes.func,
  onLanguagesUpdate: PropTypes.func,
  onLanguageColorUpdate: PropTypes.func
};

export default Customise;
