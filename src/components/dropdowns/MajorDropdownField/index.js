import * as React from 'react';
import PropTypes from 'prop-types';

import { MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

import ELIGIBLE_MAJORS from '../../../constants/eligibleMajors';
import styles from './styles';

const createFullMajorTitle = (department, major) => {
  let fullMajorTitle = '';

  if (ELIGIBLE_MAJORS[department][major] === 'Computer Engineering') {
    if (department === 'CSE')
      fullMajorTitle = `${ELIGIBLE_MAJORS[department][major]} - CSE`;
    else if (department === 'ECE')
      fullMajorTitle = `${ELIGIBLE_MAJORS[department][major]} - ECE`;
  } else fullMajorTitle = ELIGIBLE_MAJORS[department][major];

  return fullMajorTitle;
};

const MajorDropdownField = props => {
  const { classes, name, label, ...otherProps } = props;

  return (
    <Field
      className={classes.root}
      component={TextField}
      select
      name={name}
      label={label}
      {...otherProps}
    >
      {Object.keys(ELIGIBLE_MAJORS).map(department =>
        Object.keys(ELIGIBLE_MAJORS[department]).map(major => {
          const fullMajorTitle = createFullMajorTitle(department, major);
          return <MenuItem value={fullMajorTitle}>{fullMajorTitle}</MenuItem>;
        })
      )}
    </Field>
  );
};

MajorDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default withStyles(styles)(MajorDropdownField);