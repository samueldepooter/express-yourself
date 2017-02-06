import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Activity = ({i, activity, completed}) => {

  const id = i + 1;

  return (
    <li className={`activity ${activity.name}`} style={{background: activity.color}}>
      <Link to={`/activities/${id}/details`} className='infoBtn'>
        <p className='text'>i</p>
        <span className='hide'>Info</span>
      </Link>

      <Link to={`/activities/${id}/steps/1`}>
        <div className='cover'>
          <img src={`/assets/activities/covers/${activity.cover}.svg`} />
        </div>
        <p className='activityTitle'>{renderCompleted(id, completed)}<span className='text' style={{color: activity.color}}>{activity.title}</span></p>
      </Link>
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
