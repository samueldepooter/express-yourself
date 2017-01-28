import React, {Component, PropTypes} from 'react';
import {Previous, Next, FamilyMember} from '../../components';

class FamilyMembers extends Component {

  componentWillMount() {
    const {familyMembers, onMembersUpdate} = this.props;
    if (familyMembers.length > 0) return;
    onMembersUpdate(true);
  }

  render() {

    const {step, familyName, familyMembers, onIntroStepUpdate, onMembersUpdate} = this.props;

    return (
      <div>

        <h2>How many of the {familyName} family are joining this session?</h2>

        <button className='btn btn-default' onClick={() => onMembersUpdate(false)}>-</button>
        <button className='btn btn-default' onClick={() => onMembersUpdate(true)}>+</button>

        <ul className='list-inline'>
          {familyMembers.map((member, i) => <FamilyMember key={i} member={member} link={false} step={step} />)}
        </ul>

        <ul className='list-inline'>
          <li>
            <Previous step={step} onIntroStepUpdate={onIntroStepUpdate} />
          </li>
          <li>
            {renderNext(step, onIntroStepUpdate, familyMembers)}
          </li>
        </ul>

      </div>
    );
  }
}

const renderNext = (step, onIntroStepUpdate, familyMembers) => {

  const members = familyMembers.length > 1 ? `members` : `member`;

  return (
    <Next step={step} onIntroStepUpdate={onIntroStepUpdate} text={`${familyMembers.length} ${members}, check!`} />
  );
};

FamilyMembers.propTypes = {
  step: PropTypes.number,
  familyName: PropTypes.string,
  familyMembers: PropTypes.array,
  onIntroStepUpdate: PropTypes.func,
  onMembersUpdate: PropTypes.func
};

export default FamilyMembers;
