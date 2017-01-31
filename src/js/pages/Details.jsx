import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {activitiesData} from '../globals';

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

    const activity = activitiesData[index];
    this.setState({activity});

  }

  renderCompleted() {
    const {id, completed} = this.props;

    const img = `https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-128.png`;

    return completed.map((activityId, i) => {
      console.log(activityId, id);
      if (activityId === id) return <img src={img} className='checked' key={i} />;
      return;
    });
  }

  render() {
    const {activity} = this.state;
    const {title, description} = activity;
    const {id} = this.props;

    return (
      <article>
        <Link to='/activities' className='btn btn-danger'>Exit</Link>
        <h2>{this.renderCompleted()}{title}</h2>
        <p>{description}</p>
        <Link to={`/activities/${id}/steps/1`} className='btn btn-default'>Let's play!</Link>
      </article>
    );
  }
}

Details.propTypes = {
  id: PropTypes.number,
  completed: PropTypes.array
};

export default Details;
