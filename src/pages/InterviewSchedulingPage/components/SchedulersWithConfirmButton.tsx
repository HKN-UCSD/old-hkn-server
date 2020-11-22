import React, { useState, useEffect } from 'react';

import InterviewScheduler from './InterviewScheduler';
import ConfirmScheduleButton from './ConfirmScheduleButton';

interface SchedulersWithConfirmButtonProps {
  startDates: Date[];
}

function SchedulersWithConfirmButton({
  startDates,
}: SchedulersWithConfirmButtonProps): JSX.Element {
  const [dirty, setDirty] = useState(false);
  const [userSchedules, setUserSchedules] = useState<Date[][]>([[]]);

  useEffect(() => {
    const initialSchedules: Date[][] = [];

    for (let i = 0; i < startDates.length; i += 1) {
      initialSchedules.push([]);
    }

    setUserSchedules(initialSchedules);
  }, [startDates.length]);

  const updateUserSchedules = (scheduleIdx: number) => (schedule: Date[]) => {
    const userSchedulesToUpdate = userSchedules;

    userSchedulesToUpdate[scheduleIdx] = schedule;
    setUserSchedules(userSchedulesToUpdate);
  };

  return (
    <>
      {startDates.map((startDate, index) => (
        <InterviewScheduler
          key={index} // eslint-disable-line react/no-array-index-key
          startDate={startDate}
          setDirtyCallback={() => setDirty(true)}
          selectedScheduleCallback={updateUserSchedules(index)}
          reset={!dirty}
        />
      ))}
      <ConfirmScheduleButton
        disabled={!dirty}
        schedules={userSchedules}
        resetDirty={() => setDirty(false)}
      />
    </>
  );
}

export default SchedulersWithConfirmButton;
