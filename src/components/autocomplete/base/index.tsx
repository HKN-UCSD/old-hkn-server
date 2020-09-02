import React from 'react';
import { Field } from 'formik';
import { Autocomplete } from 'formik-material-ui-lab';
import { TextField } from '@material-ui/core';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';

type BaseAutoCompleteProp = {
  name: string;
  label: string;
  options: Array<any>;
  getOptionLabel?: (option: any) => any;
  multiple?: boolean;
  filterSelectedOptions?: boolean;
  fullWidth?: boolean;
};

export const BaseAutocomplete = ({
  name,
  label,
  options,
  getOptionLabel,
  multiple = false,
  filterSelectedOptions = false,
  fullWidth = false,
}: BaseAutoCompleteProp) => {
  return (
    <Field
      name={name}
      options={options}
      getOptionLabel={getOptionLabel}
      component={Autocomplete}
      multiple={multiple}
      filterSelectedOptions={filterSelectedOptions}
      fullWidth={fullWidth}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField {...params} label={label} variant='outlined' />
      )}
    />
  );
};

BaseAutocomplete.defaultProps = {
  multiple: false,
  filterSelectedOptions: false,
  fullWidth: false,
  getOptionLabel: () => {
    return null;
  },
};
