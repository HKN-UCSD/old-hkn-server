import React from 'react';
import { add, compareAsc, differenceInDays, set } from 'date-fns';

import SchedulersWithConfirmButton from './components/SchedulersWithConfirmButton';

const stableDate = set(new Date(), { minutes: 0, seconds: 0, milliseconds: 0 });
const mockInterviewStartWeek = [stableDate, add(stableDate, { weeks: 1 })];
const mockUserSchedule = [
  add(stableDate, { hours: 1 }),
  add(stableDate, { hours: 2 }),
  add(stableDate, { hours: 2, days: 1 }),
  add(stableDate, { hours: 3, days: 1 }),
  add(stableDate, { hours: 4, days: 1 }),
  add(stableDate, { hours: 4, weeks: 1 }),
  add(stableDate, { hours: 5, weeks: 1 }),
  add(stableDate, { hours: 2, days: 3, weeks: 1 }),
  add(stableDate, { hours: 3, days: 3, weeks: 1 }),
];

function InterviewSchedulingPage(): JSX.Element {
  // Add code to get interview start dates here (start date of each interview week)
  // const [interviewStartDates, setInterviewStartDates] = useState<Date[]>([]);
  // const [existingUserSchedules, setExistingUserSchedules] = useState<Date[]>([]);

  const splitExistingScheduleByWeek = (
    interviewStartWeek: Date[],
    userSchedule: Date[]
  ): Date[][] => {
    const scheduleSplitByWeek: Date[][] = Array(interviewStartWeek.length).fill(
      []
    );

    for (let i = 0; i < userSchedule.length; i += 1) {
      const currUserDate = userSchedule[i];

      for (let j = 0; j < interviewStartWeek.length; j += 1) {
        const currStartWeek = interviewStartWeek[j];

        if (j < interviewStartWeek.length - 1) {
          const nextStartWeek = interviewStartWeek[j + 1];

          if (
            compareAsc(currUserDate, currStartWeek) >= 0 &&
            compareAsc(nextStartWeek, currUserDate) > 0
          ) {
            scheduleSplitByWeek[j].push(currUserDate);
            break;
          }
        } else if (
          compareAsc(currUserDate, currStartWeek) >= 0 &&
          differenceInDays(currUserDate, currStartWeek) < 5
        ) {
          // Should be (diffInDays < numDays), where numDays is number of days to include in a week, but it is 5
          // right now because numDays for schedulers is 5 by default.
          scheduleSplitByWeek[j].push(currUserDate);
          break;
        }
      }
    }

    return scheduleSplitByWeek;
  };

  // This will spawn N number of schedule selectors if there are N elements in startDates
  return (
    <SchedulersWithConfirmButton
      startDates={mockInterviewStartWeek}
      existingUserSchedule={splitExistingScheduleByWeek(
        mockInterviewStartWeek,
        mockUserSchedule
      )}
    />
  );
}

export default InterviewSchedulingPage;
