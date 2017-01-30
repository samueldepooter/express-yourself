import React, {PropTypes} from 'react';

const CloseConfirmation = ({id, confirmation, onSetActive, onRedirect, onConfirmation}) => {

  if (confirmation) {
    return (
      <section className='confirmationBox'>

        <div>

          <h3>Close activity {id}?</h3>
          <p>All data from this activity will be lost!</p>

          <ul className='list-inline'>
            <li>
              <button
                onClick={() => onConfirmation(false)}
                className='btn btn-default'>
                Cancel
              </button>
            </li>
            <li>
              <button
                onClick={() => {onSetActive(0);onConfirmation(false);onRedirect(`/activities`);}}
                className='btn btn-danger'>
                Yes, I'm sure
              </button>
            </li>
          </ul>
        </div>

      </section>
    );
  }

  return <div></div>;
};

CloseConfirmation.propTypes = {
  id: PropTypes.number,
  confirmation: PropTypes.bool,
  onSetActive: PropTypes.func,
  onRedirect: PropTypes.func,
  onConfirmation: PropTypes.func
};

export default CloseConfirmation;
