import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {activities} from '../globals';

class Details extends Component {

  state = {
    activity: {}
  }

  componentWillMount() {
    this.fetchActivity();
  }

  fetchActivity() {

    const {id} = this.props;
    const index = id - 1;

    const activity = activities[index];
    this.setState({activity});

  }

  render() {
    const {activity} = this.state;
    const {title, description} = activity;
    const {id} = this.props;

    return (
      <article>
        <Link to='/activities' className='btn btn-danger'>Exit</Link>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={`/activities/${id}/steps/1`} className='btn btn-default'>Let's play!</Link>
      </article>
    );
  }

}

Details.propTypes = {
  id: PropTypes.string
};

export default Details;
