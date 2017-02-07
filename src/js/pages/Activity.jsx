import React, {Component, PropTypes} from 'react';
import {Close, CloseConfirmation, Customise, AnimationReaction, DrawSomething} from '../components/activities';

class Activity extends Component {

  componentWillMount() {
    const {id, onSetActive} = this.props;
    onSetActive(id);
  }

  renderActivity() {
    const {id, step, members, players, activity, onFinish, onRedirect, onActivityStepUpdate, onPlayersSubmit, onLanguagesUpdate, onLanguageColorUpdate, onCustomAvatarUpdate} = this.props;

    switch (id) {
    case 1:
      return (
        <Customise
          id={id}
          step={step}
          members={members}
          players={players}
          activity={activity}
          onFinish={onFinish}
          onActivityStepUpdate={onActivityStepUpdate}
          onPlayersSubmit={onPlayersSubmit}
          onLanguagesUpdate={onLanguagesUpdate}
          onLanguageColorUpdate={onLanguageColorUpdate}
          onCustomAvatarUpdate={onCustomAvatarUpdate}
          onRedirect={onRedirect}
        />
      );

    case 2:
      return (
        <AnimationReaction
          step={step}
          activity={activity}
        />
      );

    case 3:
      return (
        <DrawSomething
          step={step}
          activity={activity}
        />
      );

    }

  }

  render() {

    const {activity, confirmation, onSetActive, onConfirmation, onRedirect} = this.props;

    return (
      <div className='activity fullPage'>

        <CloseConfirmation
          title={activity.title}
          confirmation={confirmation}
          onSetActive={onSetActive}
          onRedirect={onRedirect}
          onConfirmation={onConfirmation}
        />

        <Close
          confirmation={confirmation}
          onSetActive={onSetActive}
          onRedirect={onRedirect}
          onConfirmation={onConfirmation}
        />

        <h2 className='hide'>{activity.title}</h2>

        {this.renderActivity()}

      </div>
    );
  }
}

Activity.propTypes = {
  id: PropTypes.number,
  activity: PropTypes.object,
  members: PropTypes.array,
  players: PropTypes.array,
  step: PropTypes.number,
  confirmation: PropTypes.bool,
  onSetActive: PropTypes.func,
  onConfirmation: PropTypes.func,
  onRedirect: PropTypes.func,
  onPlayersSubmit: PropTypes.func,
  onFinish: PropTypes.func,
  onActivityStepUpdate: PropTypes.func,
  onLanguagesUpdate: PropTypes.func,
  onLanguageColorUpdate: PropTypes.func,
  onCustomAvatarUpdate: PropTypes.func
};

export default Activity;
