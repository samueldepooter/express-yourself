import React, {Component, PropTypes} from 'react';

class Subject extends Component {

  state = {
    subject: ``
  }

  onSubjectSelect(e, language) {
    e.preventDefault();
    console.log(language);
  }

  renderNext() {
    const {subject} = this.state;
    if (!subject) return;

    return (
      <button type='submit' className='btn'>
        <img className='icon' src={`/assets/icons/check.svg`} />
        <span className='text'>Start drawing</span>
      </button>
    );
  }

  updateSubject(subject) {
    this.setState({subject: subject.value});
  }

  render() {

    console.log(this.props.players);

    const {familyLanguages} = this.props;

    return (
      <section className='fullPage subject'>

        <div className='content'>
          <h2 className='title' data-before='Choose a subject'>Choose a subject</h2>

          <ul>
            {familyLanguages.map((language, i) => {
              return (
                <li key={i}>
                  <button className='btn language' onClick={e => this.onSubjectSelect(e, language)}>{language}</button>
                </li>
              );
            })}
          </ul>

          <p>or</p>

          <form className='customSubject' onSubmit={e => this.onSubjectSelect(e, this.subject.value)}>
            <label className='hide' htmlFor='customSubject'>Custom subject</label>
            <input type='text' maxLength='30' id='customSubject' placeholder='Your own subject' ref={subject => this.subject = subject} onChange={() => this.updateSubject(this.subject)} />

            {this.renderNext()}
          </form>
        </div>
      </section>
    );
  }

}

Subject.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  players: PropTypes.array,
  familyLanguages: PropTypes.array
};

export default Subject;
