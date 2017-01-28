import React, {PropTypes} from 'react';
import {Next} from '../../components';

const FamilyName = ({step, familyName, onIntroStepUpdate, onFamilyNameUpdate, onFamilyNameSubmit}) => {
  return (
    <div>
      <h2>Which lovely family will get to play with us?</h2>

      <form onSubmit={e => onFamilyNameSubmit(e, this.familyName.value)}>
        <div className='form-group'>
          <label htmlFor='familyName'>Family Name</label>
          <input
            type='text'
            className='form-control'
            value={familyName}
            id='familyName'
            ref={name => this.familyName = name}
            placeholder='De Pooter'
            onChange={() => onFamilyNameUpdate(this.familyName.value)}
          />
        </div>

        <input type='submit' className='hide' />

        {renderNext(step, onIntroStepUpdate, familyName)}
      </form>

    </div>
  );
};

const renderNext = (step, onIntroStepUpdate, familyName) => {
  if (!familyName) return;
  return <Next step={step} onIntroStepUpdate={onIntroStepUpdate} text={`${familyName}, check!`} />;
};

FamilyName.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  familyName: PropTypes.string,
  onFamilyNameUpdate: PropTypes.func,
  onFamilyNameSubmit: PropTypes.func
};

export default FamilyName;
