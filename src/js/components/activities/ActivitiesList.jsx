import React, {PropTypes} from 'react';

import {Activity} from './';
import {activitiesData} from '../../globals';

const ActivitiesList = ({completed}) => {
  return (
    <ul className='list-unstyled activitiesList'>

      {activitiesData.map((activity, i) => <Activity key={i} i={i} activity={activity} completed={completed} />)}

      <li className='activity disabled'>
        <div className='infoBtn'>
          <p className='text'>i</p>
          <span className='hide'>Info</span>
        </div>

        <p className='activityTitle'><span className='text'>Activity</span></p>
      </li>

      <li className='activity disabled'>
        <div className='infoBtn'>
          <p className='text'>i</p>
          <span className='hide'>Info</span>
        </div>

        <p className='activityTitle'><span className='text'>Activity</span></p>
      </li>

      <li className='activity disabled'>
        <div className='infoBtn'>
          <p className='text'>i</p>
          <span className='hide'>Info</span>
        </div>

        <p className='activityTitle'><span className='text'>Activity</span></p>
      </li>
    </ul>
  );
};

ActivitiesList.propTypes = {
  completed: PropTypes.array
};

export default ActivitiesList;
