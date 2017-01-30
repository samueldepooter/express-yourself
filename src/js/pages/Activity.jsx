import React, {Component, PropTypes} from 'react';
import {Close, CloseConfirmation, Finish} from '../components/activities';

class Activity extends Component {

  componentWillMount() {
    const {id, onSetActive} = this.props;
    onSetActive(id);
  }

  componentDidMount() {
    console.log(`Activity mounted`);
  }

  render() {

    const {id, step, confirmation, onSetActive, onConfirmation, onRedirect, onFinish} = this.props;

    return (
      <section>

        <CloseConfirmation
          id={id}
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

        <h2>Activity {id} - Step {step}</h2>

        <Finish id={id} onFinish={onFinish} />

      </section>
    );
  }

}

Activity.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  confirmation: PropTypes.bool,
  onSetActive: PropTypes.func,
  onConfirmation: PropTypes.func,
  onRedirect: PropTypes.func,
  onFinish: PropTypes.func
};

export default Activity;
