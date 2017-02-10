import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const SelectDevices = ({id, step, activity, onActivityStepUpdate}) => {
  return (
    <section className='fullPage selectDevices'>

      <h2 className='title' data-before={activity.name}>{activity.name}</h2>

      <div className='content'>
        <Link to={`/activities/${id}/steps/${step + 2}`} className='btn' onClick={() => onActivityStepUpdate(step + 2)}>
          <img className='icon' src={`/assets/icons/device.svg`} />
          <span className='text'>One device</span>
        </Link>

        <p>or</p>

        <Link to={`/activities/${id}/steps/${step + 1}`} className='btn' onClick={() => onActivityStepUpdate(step + 1)}>
          <img className='icon' src={`/assets/icons/device.svg`} />
          <span className='text'>Multiple devices</span>
        </Link>
      </div>

    </section>
  );
};

SelectDevices.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  activity: PropTypes.object,
  onActivityStepUpdate: PropTypes.func
};

export default SelectDevices;
