import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

function LoadingSubmitButton({ isLoading, displayText }) {
  return (
    <div className="btn-wrap">
      <button className="form-btn" type="submit">
        {isLoading ? (
          <ReactLoading type="spin" color="#ffffff" height="15%" width="15%" />
        )
          : <React.Fragment>{displayText}</React.Fragment>
      }
      </button>
    </div>
  );
}

LoadingSubmitButton.propTypes = {
  isLoading: PropTypes.bool,
  displayText: PropTypes.string.isRequired
};

LoadingSubmitButton.defaultProps = {
  isLoading: false,
};

export default LoadingSubmitButton;
