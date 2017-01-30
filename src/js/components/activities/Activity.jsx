import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Activity = ({i, activity, completed}) => {

  const id = i + 1;

  return (
    <li>
      <h3>{renderCompleted(id, completed)}{activity.title}</h3>
      <p>{activity.description}</p>
      <ul className='list-inline'>
        <li><Link to={`/activities/${id}/details`} className='btn btn-default'>Info</Link></li>
        <li><Link to={`/activities/${id}/steps/1`} className='btn btn-default'>Let's play!</Link></li>
      </ul>
    </li>
  );
};

const renderCompleted = (id, completed) => {
  const img = `https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-128.png`;

  return completed.map((activityId, i) => {
    if (activityId === id) return <img src={img} className='checked' key={i} />;
    return;
  });
};

Activity.propTypes = {
  i: PropTypes.number,
  activity: PropTypes.object,
  completed: PropTypes.array
};

export default Activity;
