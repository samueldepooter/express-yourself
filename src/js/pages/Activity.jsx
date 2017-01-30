import React, {Component, PropTypes} from 'react';
import {Close, CloseConfirmation} from '../components';

class Activity extends Component {

  componentWillMount() {
    const {id, onSetActive} = this.props;
    onSetActive(id);
  }

  componentDidMount() {
    console.log(`Activity mounted`);
  }

  render() {

    const {id, step, confirmation, onSetActive, onConfirmation, onRedirect} = this.props;

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
  onRedirect: PropTypes.func
};

export default Activity;
