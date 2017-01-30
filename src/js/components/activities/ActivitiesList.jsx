import React, {PropTypes} from 'react';

import {Activity} from './';
import {activities} from '../../globals';

const ActivitiesList = ({completed}) => {
  return (
    <ul className='list-unstyled'>
      {activities.map((activity, i) => <Activity key={i} i={i} activity={activity} completed={completed}  />)}
    </ul>
  );
};

ActivitiesList.propTypes = {
  completed: PropTypes.array
};

export default ActivitiesList;
