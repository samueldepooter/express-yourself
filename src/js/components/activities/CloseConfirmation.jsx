import React, {PropTypes} from 'react';

const CloseConfirmation = ({title, confirmation, onSetActive, onRedirect, onConfirmation}) => {

  if (confirmation) {
    return (
      <section className='confirmationBox'>

        <div>

          <h3>Close activity "{title}"?</h3>
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
  title: PropTypes.string,
  confirmation: PropTypes.bool,
  onSetActive: PropTypes.func,
  onRedirect: PropTypes.func,
  onConfirmation: PropTypes.func
};

export default CloseConfirmation;
