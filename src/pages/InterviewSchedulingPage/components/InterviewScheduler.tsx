import React, { useEffect, useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';

interface InterviewSchedulerProps {
  numDays?: number;
  minTime?: number;
  maxTime?: number;
  startDate?: Date;
  reset?: boolean;
  setDirtyCallback?: () => void;
  selectedScheduleCallback?: (arg: Date[]) => void;
}

function InterviewScheduler({
  numDays = 5,
  minTime = 11,
  maxTime = 21,
  startDate = new Date(),
  reset = false,
  setDirtyCallback = () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  selectedScheduleCallback = () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
}: InterviewSchedulerProps): JSX.Element {
  const [selectedSchedule, setSelectedSchedule] = useState<Date[]>([]);

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

  // Can probably use useCallback() here, but this works for now
  const handleChange = (newSchedule: Date[]) => {
    if (!isEqualSchedules(selectedSchedule, newSchedule)) {
      selectedScheduleCallback(newSchedule);
      setSelectedSchedule(newSchedule);

      setDirtyCallback();
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectedSchedule([]);
    }
  }, [reset]);

  return (
    <ScheduleSelector
      selection={selectedSchedule}
      numDays={numDays}
      minTime={minTime}
      maxTime={maxTime}
      startDate={startDate}
      onChange={handleChange}
      dateFormat='ddd M/D'
    />
  );
}

export default InterviewScheduler;
