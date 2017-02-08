import React from 'react';
import {Link} from 'react-router';

const Start = () => {
  return (
    <section className='start fullPage'>
      <h2 className='logo'><span className='hide'>Express yourself logo</span></h2>

      <p>The application that assists you in analysing emotion in language.</p>

      <div className='buttons'>
        <Link className='btn' to='/intro/1'>
          <img className='icon' src='/assets/icons/check.svg' />
          <span className='text'>Start new session</span>
        </Link>

        <p className='or'>or</p>

        <Link to='/' className='btn existing'>
          <img className='icon' src='/assets/icons/back.svg' />
          <span className='text'>Join existing</span>
        </Link>
      </div>

    </section>
  );
};

export default Start;
