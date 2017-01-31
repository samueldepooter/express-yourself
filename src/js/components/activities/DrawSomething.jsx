import React, {PropTypes} from 'react';
import {ExplanationVideo} from './';

const DrawSomething = ({step, activity}) => {

  switch (step) {
  case 1:
    return (
      <ExplanationVideo activity={activity} />
    );
  }

};

DrawSomething.propTypes = {
  step: PropTypes.number,
  activity: PropTypes.object
};

export default DrawSomething;
