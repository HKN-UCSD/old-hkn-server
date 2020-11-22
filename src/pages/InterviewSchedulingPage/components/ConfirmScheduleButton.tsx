import React from 'react';

import { Button } from '@SharedComponents';

interface ConfirmScheduleButtonProps {
  schedules: Date[][];
  children?: string;
  resetDirty: () => void;
  disabled: boolean;
}

function ConfirmScheduleButton({
  schedules,
  children = 'Confirm Interview Schedule',
  disabled,
  resetDirty,
}: ConfirmScheduleButtonProps) {
  // Either make API call to update user's availabilities in handleOnClick (meaning
  // you have to make handleOnClick async) or have a state to store the flattened
  // schedule, then set that state in handleOnClick, then have a useEffect to handle
  // the API call (either way should work, and I've tested to be sure that both handleOnClick and
  // the useEffect call has the latest user schedule).

  // const [schedule, setSchedule] = useState<Date[]>([]);

  const flattenSchedules = (userSchedulesToFlatten: Date[][]): Date[] => {
    let flattenedSchedule: Date[] = [];

    for (let i = 0; i < userSchedulesToFlatten.length; i += 1) {
      flattenedSchedule = flattenedSchedule.concat(userSchedulesToFlatten[i]);
    }

    return flattenedSchedule;
  };

  const handleOnClick = () => {
    console.log(schedules);
    console.log(flattenSchedules(schedules));

    // setSchedule(flattenSchedules(schedules))
    resetDirty();
  };

  /* useEffect(() => {
    console.log(schedule);
  }, [schedule]); */

  return (
    <Button primary positive disabled={disabled} onClick={handleOnClick}>
      {children}
    </Button>
  );
}

export default ConfirmScheduleButton;
