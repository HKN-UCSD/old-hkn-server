import React, { useState, useEffect } from 'react';

import { BaseAutocomplete } from '../base';

import { getMultipleUsers, processMultipleUsers } from '@Services/ApiUsers';

type OfficerNameData = {
  id: number;
  firstName: string;
  lastName: string;
};

type OfficerAutocompleteProp = {
  name: string;
  label: string;
  fullWidth: boolean;
};

export const OfficerNameAutocomplete = (props: OfficerAutocompleteProp) => {
  const { name, label, fullWidth } = props;
  const [officerNames, setOfficerNames] = useState<OfficerNameData[]>([]);

  useEffect(() => {
    getMultipleUsers({
      officers: true,
      names: true,
    }).then(officerNameArr =>
      setOfficerNames(processMultipleUsers(officerNameArr))
    );
  }, []);

  return (
    <BaseAutocomplete
      name={name}
      label={label}
      multiple
      filterSelectedOptions
      options={officerNames}
      getOptionLabel={option => `${option.firstName} ${option.lastName}`}
      fullWidth={fullWidth}
    />
  );
};
