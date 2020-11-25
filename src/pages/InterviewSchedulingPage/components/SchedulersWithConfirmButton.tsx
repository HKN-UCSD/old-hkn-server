import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import InterviewScheduler from './InterviewScheduler';

import { Button } from '@SharedComponents';

interface SchedulersWithConfirmButtonProps {
  startDates: Date[];
  existingUserSchedule: Date[][];
}

const isEqualSchedules = (
  currSchedule: Date[],
  newSchedule: Date[]
): boolean => {
  if (currSchedule.length !== newSchedule.length) {
    return false;
  }

  for (let i = 0; i < currSchedule.length; i += 1) {
    if (currSchedule[i].getTime() !== newSchedule[i].getTime()) {
      return false;
    }
  }

  return true;
};

function SchedulersWithConfirmButton({
  startDates,
  existingUserSchedule,
}: SchedulersWithConfirmButtonProps): JSX.Element {
  const [isDirty, setIsDirty] = useState(false);
  const [userSchedules, setUserSchedules] = useState<Date[][]>([]);

  // Initialize the 2D array
  useEffect(() => {
    setUserSchedules(existingUserSchedule);
  }, [existingUserSchedule]);

  // Since each element in userSchedules represents a separate scheduler, when a scheduler is
  // modified, we modify its value in userSchedules via index.
  const setScheduleHOFByIndex = (scheduleIdx: number) => (schedule: Date[]) => {
    const userSchedulesToUpdate = Array.from(userSchedules);

    if (!isEqualSchedules(userSchedulesToUpdate[scheduleIdx], schedule)) {
      userSchedulesToUpdate[scheduleIdx] = schedule;

      setUserSchedules(userSchedulesToUpdate);
      setIsDirty(true);
    }
  };

  const handleOnClickConfirm = () => {
    // Make API call here
    console.log(userSchedules.flat());
    setIsDirty(false);
  };

  return (
    <Grid container direction='column' alignItems='center' spacing={3}>
      <Grid item>
        {startDates.map((startDate, index) => (
          <InterviewScheduler
            selectedSchedule={userSchedules[index]}
            key={startDate.toDateString() + index} // eslint-disable-line react/no-array-index-key
            startDate={startDate}
            selectedScheduleCallback={setScheduleHOFByIndex(index)}
          />
        ))}
      </Grid>

      <Grid item>
        <Button
          primary
          positive
          disabled={!isDirty}
          onClick={handleOnClickConfirm}
        >
          Confirm Interview Schedule
        </Button>
      </Grid>
    </Grid>
  );
}

export default SchedulersWithConfirmButton;
