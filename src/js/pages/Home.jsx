import React from 'react';
import {Link} from 'react-router';

const Home = () => {
  return (
    <header>
      <h1>Home</h1>
      <Link to='/intro/1'>Start session</Link>
    </header>
  );
};

export default Home;
