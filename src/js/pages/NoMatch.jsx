import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const NoMatch = ({location}) => {
  return (
    <div>
      <p className='bg-danger'>Route {location.pathname} does not exist!</p>
      <Link to='/' className='btn btn-default'>Back to home</Link>
    </div>
  );
};

NoMatch.propTypes = {
  location: PropTypes.object
};

export default NoMatch;
