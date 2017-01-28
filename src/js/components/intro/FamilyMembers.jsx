import React, {PropTypes} from 'react';
import {Previous, Next} from '../../components';

const FamilyMembers = ({step, onIntroStepUpdate, familyName}) => {
  return (
    <div>

      <h2>How many of the {familyName} family are joining this session?</h2>

      <ul className='list-inline'>
        <li>
          <Previous step={step} onIntroStepUpdate={onIntroStepUpdate} />
        </li>
        <li>
          <Next step={step} onIntroStepUpdate={onIntroStepUpdate} />
        </li>
      </ul>

    </div>
  );
};

FamilyMembers.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  familyName: PropTypes.string
};

export default FamilyMembers;
