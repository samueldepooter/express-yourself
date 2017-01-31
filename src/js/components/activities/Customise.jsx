import React, {PropTypes} from 'react';
import {ExplanationVideo} from './';

const Customise = ({step, activity}) => {

  switch (step) {
  case 1:
    return (
      <ExplanationVideo activity={activity} />
    );
  }

};

Customise.propTypes = {
  step: PropTypes.number,
  activity: PropTypes.object
};

export default Customise;
