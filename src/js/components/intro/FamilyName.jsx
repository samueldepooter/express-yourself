import React, {PropTypes} from 'react';
import {Next} from '../../components';

const FamilyName = ({step, changeIntroStep, updateFamilyName, familyName}) => {
  return (
    <div>
      <h1>Which lovely family will get to play with us?</h1>

      <form onSubmit={e => e.preventDefault()}>
        <div className='form-group'>
          <label htmlFor='familyName'>Family Name</label>
          <input type='text' className='form-control' value={familyName} id='familyName' ref={name => this.familyName = name} placeholder='De Pooter' onInput={() => updateFamilyName(this.familyName.value)} />
        </div>

        {renderNext(step, changeIntroStep, familyName)}
      </form>

    </div>
  );
};

FamilyName.propTypes = {
  step: PropTypes.number,
  changeIntroStep: PropTypes.func,
  updateFamilyName: PropTypes.func,
  familyName: PropTypes.string
};

const renderNext = (step, changeIntroStep, familyName) => {
  if (!familyName) return;
  return <Next step={step} changeIntroStep={changeIntroStep} text={`${familyName}, check!`} />;
};

export default FamilyName;
