import React from 'react';

import { Button } from '@SharedComponents';

interface ConfirmScheduleButtonProps {
  schedule: Array<Date>;
  // eslint-disable-next-line react/require-default-props
  children?: string;
}

function ConfirmScheduleButton({
  schedule,
  children = 'Confirm Interview Schedule',
}: ConfirmScheduleButtonProps): JSX.Element {
  return (
    <Button primary positive onClick={() => schedule}>
      {children}
    </Button>
  );
}

export default ConfirmScheduleButton;
