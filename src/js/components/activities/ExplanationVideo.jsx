import React, {PropTypes} from 'react';

const ExplanationVideo = ({activity}) => {
  return (
    <p>Show intro animation video of "{activity.title}"</p>
  );
};

ExplanationVideo.propTypes = {
  activity: PropTypes.object
};

export default ExplanationVideo;
