import React, {PropTypes} from 'react';
import {ExplanationVideo} from './';

const AnimationReaction = ({step, activity}) => {

  switch (step) {
  case 1:
    return (
      <ExplanationVideo activity={activity} />
    );
  }

};

AnimationReaction.propTypes = {
  step: PropTypes.number,
  activity: PropTypes.object
};

export default AnimationReaction;
