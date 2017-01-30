import React, {PropTypes} from 'react';

const EndSessionConfirmation = ({confirmation, onRedirect, onConfirmation}) => {

  if (confirmation) {
    return (
      <section className='confirmationBox'>

        <div>
          <h3>Complete session?</h3>
          <p>Ending the session will download your report automatically.</p>

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
                onClick={() => {onConfirmation(false);onRedirect(`/`);}}
                className='btn btn-success'>
                Complete session
              </button>
            </li>
          </ul>
        </div>

      </section>
    );
  }

  return <div></div>;
};

EndSessionConfirmation.propTypes = {
  confirmation: PropTypes.bool,
  onRedirect: PropTypes.func,
  onConfirmation: PropTypes.func
};

export default EndSessionConfirmation;
