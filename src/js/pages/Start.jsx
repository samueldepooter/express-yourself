import React from 'react';
import {Link} from 'react-router';

const Start = () => {
  return (
    <section className='start fullPage'>
      <h2 className='logo'>Express yourself logo</h2>

      <p>The application that assists you in analysing emotion in language.</p>

      <Link className='btn' to='/intro/1'>
        <img className='icon' src='/assets/icons/check.svg' />
        <span className='text'>Start session</span>
      </Link>
    </section>
  );
};

export default Start;
