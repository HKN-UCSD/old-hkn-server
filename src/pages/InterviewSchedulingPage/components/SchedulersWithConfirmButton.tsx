import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import {
  add,
  set,
  formatISO,
  parseISO,
  getYear,
  getMonth,
  getDate,
  getHours,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import InterviewScheduler from './InterviewScheduler';

import { Button } from '@SharedComponents';
import { UserContext } from '@Contexts';
import {
  updateUserInterviewAvailabilities,
  InterviewAvailability,
} from '@Services/UserService';

interface SchedulersWithConfirmButtonProps {
  startDates: Date[];
  existingUserSchedule: Date[][];
}

const minTimesToPick = 8;
const commonTimezone = 'America/Los_Angeles'; // PST

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

// Assume end time is always 1hr more than start time
// Also use { startTime: Date, endTime: Date }[] until type issue on backend is resolved
const getStartEndTimesFromStarts = (
  startTimes: Date[]
): InterviewAvailability[] => {
  const startEndTimes = startTimes.map((start: Date) => {
    const end: Date = add(start, { hours: 1 });
    return { start: formatISO(start), end: formatISO(end) };
  });

  return startEndTimes;
};

const updateTimeValuesFromExistingDate = (
  dateToExtract: Date,
  dateToUpdate: Date
): Date => {
  const extractedYear = getYear(dateToExtract);
  const extractedMonth = getMonth(dateToExtract);
  const extractedDate = getDate(dateToExtract);
  const extractedHours = getHours(dateToExtract);

  const updatedDate = set(dateToUpdate, {
    year: extractedYear,
    month: extractedMonth,
    date: extractedDate,
    hours: extractedHours,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  return updatedDate;
};

const convertClientTimezoneToCommonTZ = (
  availabilities: InterviewAvailability[]
): InterviewAvailability[] => {
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Sauce: https://stackoverflow.com/a/34602679
  let convertedAvailabilities = availabilities;

  if (clientTimezone !== commonTimezone) {
    convertedAvailabilities = convertedAvailabilities.map(
      ({ start, end }: InterviewAvailability) => {
        const placeholderTimeInPST = utcToZonedTime(new Date(), commonTimezone);

        const startTimeInCommonTZ = updateTimeValuesFromExistingDate(
          parseISO(start),
          placeholderTimeInPST
        );
        const endTimeInCommonTZ = updateTimeValuesFromExistingDate(
          parseISO(end),
          placeholderTimeInPST
        );

        return {
          start: formatISO(startTimeInCommonTZ),
          end: formatISO(endTimeInCommonTZ),
        };
      }
    );
  }

  return convertedAvailabilities;
};

function SchedulersWithConfirmButton({
  startDates,
  existingUserSchedule,
}: SchedulersWithConfirmButtonProps): JSX.Element {
  const [isDirty, setIsDirty] = useState(false);
  const [userSchedules, setUserSchedules] = useState<Date[][]>([]);
  const userId = useContext(UserContext)?.userId;

  // Initialize the 2D array
  useEffect(() => {
    setUserSchedules(existingUserSchedule);
  }, [existingUserSchedule]);

  if (!userId) {
    // they're not logged in which is impossible
    return <></>;
  }

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

  const handleOnClickConfirm = async () => {
    const flattenedSchedule = userSchedules.flat();

    if (flattenedSchedule.length >= minTimesToPick) {
      const availabilities = getStartEndTimesFromStarts(flattenedSchedule);

      const availabilitiesInCommonTZ = convertClientTimezoneToCommonTZ(
        availabilities
      );
      console.log(availabilitiesInCommonTZ);

      // Make API call here
      await updateUserInterviewAvailabilities(
        parseInt(userId, 10),
        availabilitiesInCommonTZ
      );

      setIsDirty(false);
      alert('Availabilities successfully updated');
    } else {
      alert(
        'At least 8 interview times must be picked for this interview cycle'
      );
    }
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
