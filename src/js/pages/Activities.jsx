import React, {Component} from 'react';
import {Link} from 'react-router';
import {activities} from '../globals';

class Activities extends Component {

  componentDidMount() {
    console.log(`Activities mounted`);
    console.log(activities);
  }

  render() {
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
                  <li><Link to={`activities/${id}/details`} className='btn btn-default'>Info</Link></li>
                  <li><Link to={`/activities/${id}/steps/1`} className='btn btn-default'>Play now</Link></li>
                </ul>
              </li>
            );
          })}
        </ul>

        <Link to='/' className='btn btn-danger'>End session</Link>
      </section>
    );
  }

}

Activities.propTypes = {};

export default Activities;
