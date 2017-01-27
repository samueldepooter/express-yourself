import React from 'react';
import {Link} from 'react-router';

const Start = () => {
  return (
    <header>
      <h1>Express yourself!</h1>
      <p>Intro screen of application</p>
      <Link to='/intro/1' className='btn btn-default'>Start session</Link>
    </header>
  );
};

export default Start;
