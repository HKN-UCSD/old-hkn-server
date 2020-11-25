import React from 'react';

import SchedulersWithConfirmButton from './components/SchedulersWithConfirmButton';

interface InterviewSchedulingPageProps {
  userID?: string;
}

function InterviewSchedulingPage(): JSX.Element {
  // Add code to get interview start dates here (start date of each interview week)
  // const [interviewStartDates, setInterviewStartDates] = useState<Date[]>([]);
  // const [existingUserSchedules, setExistingUserSchedules] = useState<Date[]>([]);

  // This will spawn N number of schedule selectors if there are N elements in startDates
  return (
    <SchedulersWithConfirmButton startDates={[new Date(), new Date(10, 2)]} />
  );
}

export default InterviewSchedulingPage;
