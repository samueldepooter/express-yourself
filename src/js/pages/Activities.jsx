import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {activities} from '../globals';

class Activities extends Component {

  componentDidMount() {
    console.log(`Activities mounted`);
  }

  render() {

    const {family} = this.props;
    const {members} = family;

    console.log(this.props);

    return (
      <section>
        <h2>Activities</h2>

        <ul className='list-unstyled'>
          {activities.map((activity, i) => {

            const id = i + 1;

            return (
              <li key={i}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <ul className='list-inline'>
                  <li><Link to={`/activities/${id}/details`} className='btn btn-default'>Info</Link></li>
                  <li><Link to={`/activities/${id}/steps/1`} className='btn btn-default'>Let's play!</Link></li>
                </ul>
              </li>
            );
          })}
        </ul>

        <section>

          <h3>{family.name}</h3>

          <ul className='list-inline'>
            {members.map((member, i) => {
              return (
                <li key={i}>
                  <img src={`/assets/avatars/${member.avatar}.svg`} />
                  <p>{member.name}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <Link to='/' className='btn btn-danger'>End session</Link>
      </section>
    );
  }

}

Activities.propTypes = {
  family: PropTypes.object
};

export default Activities;
