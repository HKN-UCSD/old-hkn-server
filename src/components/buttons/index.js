import React from 'react';
import PropTypes from 'prop-types';

import { Button as MuiButton } from '@material-ui/core';

function Button({ text, primary, secondary, positive, negative, ...props }) {
  const buttonProps = {};
  if (primary) {
    buttonProps.variant = 'contained';
  } else if (secondary) {
    buttonProps.variant = 'outlined';
  }

  if (positive) {
    buttonProps.color = 'primary';
  } else if (negative) {
    buttonProps.color = 'secondary';
  }

  return (
    <MuiButton {...props} {...buttonProps}>
      {text}
    </MuiButton>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  positive: PropTypes.bool,
  negative: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
  secondary: false,
  positive: false,
  negative: false,
};
