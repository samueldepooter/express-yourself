import React, {Component, PropTypes} from 'react';

import {EndSession, EndSessionConfirmation, ActivitiesList, FamilyMembers} from '../components/activities';

class Activities extends Component {

  componentDidMount() {
    console.log(`Activities mounted`);
  }

  render() {

    const {family, confirmation, completed, onConfirmation, onRedirect} = this.props;
    const {members} = family;

    return (
      <section>

        <h2>Activities</h2>

        <EndSessionConfirmation
          confirmation={confirmation}
          onRedirect={onRedirect}
          onConfirmation={onConfirmation}
        />

        <ActivitiesList
          completed={completed}
        />

        <FamilyMembers
          members={members}
        />

        <ul className='list-inline'>
          <li>
            <a href='/assets/download/report.png' target='_blank' className='btn btn-default'>Download report</a>
          </li>
          <li>
            <EndSession
              confirmation={confirmation}
              onRedirect={onRedirect}
              onConfirmation={onConfirmation}
            />
          </li>
        </ul>

      </section>
    );
  }
}

Activities.propTypes = {
  family: PropTypes.object,
  confirmation: PropTypes.bool,
  completed: PropTypes.array,
  onConfirmation: PropTypes.func,
  onRedirect: PropTypes.func
};

export default Activities;
