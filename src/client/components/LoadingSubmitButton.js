import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

function LoadingSubmitButton({ isLoading, displayText }) {
  return (
    <button className="form-btn" type="submit">
      {isLoading ? (
        <ReactLoading type="spin" color="#00c9a7" height="15%" width="15%" />
      )
        : <React.Fragment>{displayText}</React.Fragment>
      }
    </button>
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
