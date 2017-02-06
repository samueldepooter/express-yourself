import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {activitiesData} from '../globals';
import {EndSession, EndSessionConfirmation, FamilyMembers} from '../components/activities';

class Details extends Component {

  state = {
    activity: {}
  }

  componentWillMount() {
    this.fetchActivity();
  }

  fetchActivity() {

    const {id} = this.props;
    const index = id - 1;

    const activity = activitiesData[index];
    this.setState({activity});

  }

  renderCompleted() {
    const {id, completed} = this.props;

    const img = `https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-128.png`;

    return completed.map((activityId, i) => {
      console.log(activityId, id);
      if (activityId === id) return <img src={img} className='checked' key={i} />;
      return;
    });
  }

  render() {
    const {activity} = this.state;
    const {title, description} = activity;

    const {id, family, confirmation, onConfirmation, onRedirect} = this.props;
    const {members} = family;

    return (
      <article className='activityDetails'>

        <EndSessionConfirmation
          confirmation={confirmation}
          onRedirect={onRedirect}
          onConfirmation={onConfirmation}
        />

        <header className='header'>

          <Link to='/activities' className='btn closeBtn'><span className='hide'>Close</span></Link>

          <div className='cover' style={{background: activity.color}}>
            <div className='bg'></div>
            <img src={`/assets/activities/covers/${activity.name}.svg`} className='image' />
          </div>

          <h2 className='title' data-before={title}>{this.renderCompleted()}{title}</h2>
        </header>

        <div className='details'>

          <div className='sidebar'>

            <section className='section'>
              <h3 className='title'>Age</h3>
              <p>{activity.age}</p>
            </section>

            <section className='section'>
              <h3 className='title'>Players</h3>
              <p>{activity.players} players</p>
            </section>

            <section className='section'>
              <h3 className='title'>Devices</h3>
              <p>{activity.devices} devices</p>
            </section>

            <Link to={`/activities/${id}/steps/1`} className='btn'>
              <img className='icon' src='/assets/icons/play.svg' />
              <span className='text'>Play</span>
            </Link>
          </div>

          <div className='main'>
            <section className='section'>
              <h3 className='title'>Description</h3>
              <p>{description}</p>
            </section>

              <section className='section'>
                <h3 className='title'>Gameplay</h3>
                <p>Video</p>
              </section>
          </div>

        </div>

        <div className='footer'>
          <div className='content'>
            <FamilyMembers members={members} />

            <ul className='list-inline'>
              <li>
                <a href='/assets/download/report.png' target='_blank' className='btn'>
                  <img src='/assets/icons/download.svg' className='icon dl' />
                  <span className='hide'>Download report</span>
                </a>
              </li>
              <li>
                <EndSession
                  confirmation={confirmation}
                  onRedirect={onRedirect}
                  onConfirmation={onConfirmation}
                />
              </li>
            </ul>
          </div>
        </div>
      </article>
    );
  }
}

Details.propTypes = {
  id: PropTypes.number,
  completed: PropTypes.array,
  family: PropTypes.object,
  confirmation: PropTypes.bool,
  onConfirmation: PropTypes.func,
  onRedirect: PropTypes.func
};

export default Details;
