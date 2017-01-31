import React, {Component, PropTypes} from 'react';
import {Close, CloseConfirmation, Finish, Customise, AnimationReaction, DrawSomething} from '../components/activities';

class Activity extends Component {

  componentWillMount() {
    const {id, onSetActive} = this.props;
    onSetActive(id);
  }

  renderActivity() {
    const {id, step, activity} = this.props;

    switch (id) {
    case 1:
      return (
        <Customise step={step} activity={activity} />
      );

    case 2:
      return (
        <AnimationReaction step={step} activity={activity} />
      );

    case 3:
      return (
        <DrawSomething step={step} activity={activity} />
      );

    }

  }

  render() {

    const {id, activity, confirmation, onSetActive, onConfirmation, onRedirect, onFinish} = this.props;

    return (
      <section>

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

        <h2>{activity.title}</h2>

        {this.renderActivity()}

        <Finish id={id} onFinish={onFinish} />

      </section>
    );
  }
}

Activity.propTypes = {
  id: PropTypes.number,
  activity: PropTypes.object,
  step: PropTypes.number,
  confirmation: PropTypes.bool,
  onSetActive: PropTypes.func,
  onConfirmation: PropTypes.func,
  onRedirect: PropTypes.func,
  onFinish: PropTypes.func
};

export default Activity;
