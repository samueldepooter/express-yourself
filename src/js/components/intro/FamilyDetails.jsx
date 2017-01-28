import React, {PropTypes} from 'react';
import {Previous} from '../../components';

const FamilyDetails = ({step, familyName, onIntroStepUpdate}) => {
  return (
    <div>

      <h2>The {familyName} family</h2>
      <p>Tap on a family member to fill in the details</p>

      <ul className='list-inline'>
        <li>
          <Previous step={step} onIntroStepUpdate={onIntroStepUpdate} />
        </li>
      </ul>

    </div>
  );
};

FamilyDetails.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  familyName: PropTypes.string
};

export default FamilyDetails;
