import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const NoMatch = ({location}) => {
  return (
    <div>
      <p>Route {location.pathname} does not exist!</p>
      <Link to='/'>Back to home</Link>
    </div>
  );
};

NoMatch.propTypes = {
  location: PropTypes.object
};

export default NoMatch;
