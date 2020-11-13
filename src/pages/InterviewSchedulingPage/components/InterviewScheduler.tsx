import React, { useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';

import ConfirmScheduleButton from './ConfirmScheduleButton';

interface InterviewSchedulerProps {
  numDays: number;
  minTime: number;
  maxTime: number;
  startDate: Date;
}

function InterviewScheduler({
  numDays,
  minTime,
  maxTime,
  startDate,
}: InterviewSchedulerProps): JSX.Element {
  const [selectedSchedule, setSelectedSchedule] = useState([]);

  const handleChange = newSchedule => {
    setSelectedSchedule(newSchedule);
  };

  return (
    <>
      <ScheduleSelector
        selection={selectedSchedule}
        numDays={numDays}
        minTime={minTime}
        maxTime={maxTime}
        startDate={startDate}
        onChange={handleChange}
      />

      <ConfirmScheduleButton schedule={selectedSchedule} />
    </>
  );
}

export default InterviewScheduler;
