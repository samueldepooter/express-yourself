import React, {PropTypes} from 'react';
import {Previous, Next, FamilyMember} from '../../components';

const FamilyDetails = ({step, familyName, familyMembers, onIntroStepUpdate}) => {

  return (
    <div>

      <h2>The {familyName} family</h2>
      <p>Tap on a family member to fill in the details</p>

      <ul className='list-inline'>
        {familyMembers.map((member, i) => <FamilyMember key={i} member={member} link={true} step={step} />)}
      </ul>

      <ul className='list-inline'>
        <li>
          <Previous step={step} onIntroStepUpdate={onIntroStepUpdate} />
        </li>
        <li>
          {renderNext(familyMembers, step, onIntroStepUpdate)}
        </li>
      </ul>

    </div>
  );
};

const renderNext = (familyMembers, step, onIntroStepUpdate) => {

  const done = familyMembers.map(member => {
    return member.completed ? true : false;
  });

  //is there any false in the done array -> don't show next button
  if (done.indexOf(false) >= 0) return;

  return <Next step={step} onIntroStepUpdate={onIntroStepUpdate} />;
};

FamilyDetails.propTypes = {
  step: PropTypes.number,
  familyMembers: PropTypes.array,
  onIntroStepUpdate: PropTypes.func,
  familyName: PropTypes.string
};

export default FamilyDetails;
