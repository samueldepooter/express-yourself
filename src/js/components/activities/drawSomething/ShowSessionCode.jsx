import React, {PropTypes} from 'react';
import {Next} from '../';

const ShowSessionCode = ({id, step, room, onActivityStepUpdate}) => {
  return (
    <section className='fullPage showSessionCode'>

      <div className='content'>
        <h2 className='title' data-before='Connect devices'>Connect devices</h2>
        <p>Go to <span className='bold'>https://express-yourself.com/join</span> on your other device and fill in the code below!</p>

        <p className='code'>{room.code}</p>
        <p>Devices connected: {room.devices.length}</p>

        {renderNext(id, step, room, onActivityStepUpdate)}
      </div>

    </section>
  );
};

const renderNext = (id, step, room, onActivityStepUpdate) => {
  const {devices} = room;

  if (devices.length <= 1) return (
    <p className='btn disabled'>
      <img className='icon' src={`/assets/icons/close.svg`} />
      <span className='text'>Connect more devices</span>
    </p>
  );

  return <Next id={id} step={step} text={`Let's begin!`} onActivityStepUpdate={onActivityStepUpdate} />;
};

ShowSessionCode.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  room: PropTypes.object,
  onActivityStepUpdate: PropTypes.func
};

export default ShowSessionCode;
