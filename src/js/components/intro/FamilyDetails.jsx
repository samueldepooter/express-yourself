import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Previous, FamilyMember} from '../../components';

const FamilyDetails = ({step, familyName, familyMembers, onIntroStepUpdate, onIntroCompleted}) => {

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
          {renderNext(onIntroCompleted)}
        </li>
      </ul>

    </div>
  );
};

const renderNext = onIntroCompleted => {

  const done = onIntroCompleted();

  if (!done) return;

  return <Link to='/overview' className='btn btn-default'>Time for activities!</Link>;
};

FamilyDetails.propTypes = {
  step: PropTypes.number,
  familyName: PropTypes.string,
  familyMembers: PropTypes.array,
  onIntroStepUpdate: PropTypes.func,
  onIntroCompleted: PropTypes.func
};

export default FamilyDetails;
