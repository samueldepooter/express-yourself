import React, {PropTypes} from 'react';
import {Next} from './';

const ExplanationVideo = ({id, step, activity, onActivityStepUpdate}) => {

  //als video gedaan is -> automatisch doorgaan naar volgende stap

  return (
    <div>
      <p>Show intro animation video of "{activity.title}"</p>
      <Next id={id} step={step} text='Skip' onActivityStepUpdate={onActivityStepUpdate} />
    </div>
  );
};

ExplanationVideo.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  activity: PropTypes.object,
  onActivityStepUpdate: PropTypes.func
};

export default ExplanationVideo;
