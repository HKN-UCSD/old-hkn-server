import * as React from 'react';

import GenericDropdownField from '@SharedComponents/dropdowns/base';
import EVENT_STATUS from '@Constants/eventStatus';

type EventStatusFieldProp = {
  name: string;
  label: string;
  fullWidth: boolean;
};

const EventStatusDropdownField = (props: EventStatusFieldProp) => {
  const { name, label, fullWidth } = props;

  return (
    <GenericDropdownField
      name={name}
      label={label}
      fullWidth={fullWidth}
      capitalizeLabel
      selections={Object.values(EVENT_STATUS)}
    />
  );
};

export default EventStatusDropdownField;
