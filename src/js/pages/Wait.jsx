import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class Wait extends Component {

  state = {}

  render() {

    const {code, devices, onLeaveRoom} = this.props;

    return (
      <section className='fullPage wait'>

        <Link to='/' onClick={() => onLeaveRoom(code)} className='btn closeBtn'><span className='hide'>Close</span></Link>

        <div className='content'>

          <h2 className='title' data-before='This device is ready !'>This device is ready !</h2>
          <p>Waiting for the professional to start the activity.</p>

        </div>

        <div className='footer'>
          <div className='roomWrap'>
            <p className='room'>Room</p>
            <p className='code'>{code}</p>
          </div>

          <div className='devices'>
            <p className='connected'>Connected devices</p>
            <ul className='list'>
              {devices.map((device, i) => <li key={i} className='deviceWrap'><img src='/assets/icons/device.svg' className='device' /><span className='hide'>Device</span></li>)}
            </ul>
          </div>
        </div>
      </section>
    );
  }

}

Wait.propTypes = {
  code: PropTypes.string,
  devices: PropTypes.array,
  onLeaveRoom: PropTypes.func
};

export default Wait;
