import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class Join extends Component {

  state = {}

  submitCode(e, code) {
    e.preventDefault();

    const {onSubmitCode} = this.props;
    const value = code.value;

    onSubmitCode(value);
  }

  renderError() {
    const {error} = this.props;
    return <p>{error}</p>;
  }

  render() {
    return (
      <section className='join fullPage'>

        <h2 className='title' data-before='Join a session'>Join a session</h2>
        <p className='explanation'>Connect this device to another one so you can do activities with multiple people at the same time!</p>

        <div className='content'>
          {this.renderError()}
          <form onSubmit={e => this.submitCode(e, this.code)} className='codeWrap'>

            <label htmlFor='roomCode'>Use the <span className='bold'>4-digit code</span> on your main device</label>

            <div className='codeInput'>
              <input type='number' className='code' required min='1000' max='9999' maxLength='4' id='roomCode' ref={code => this.code = code} placeholder='1234' />
              <button type='submit' className='btn'>
                <img className='icon' src='/assets/icons/check.svg' />
              </button>
            </div>
          </form>
        </div>

        <div className='footer'>
          <Link to='/' className='btn backBtn'>
            <img className='icon' src='/assets/icons/back.svg' />
            <p className='text'>Back to menu</p>
          </Link>
        </div>
      </section>
    );
  }

}

Join.propTypes = {
  onSubmitCode: PropTypes.func,
  error: PropTypes.string
};

export default Join;
