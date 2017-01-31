import React, {PropTypes} from 'react';

import {Activity} from './';
import {activitiesData} from '../../globals';

const ActivitiesList = ({completed}) => {
  return (
    <ul className='list-unstyled'>
      {activitiesData.map((activity, i) => <Activity key={i} i={i} activity={activity} completed={completed}  />)}
    </ul>
  );
};

ActivitiesList.propTypes = {
  completed: PropTypes.array
};

export default ActivitiesList;
