import React from 'react';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventIcon from '@material-ui/icons/Event';
import AlarmIcon from '@material-ui/icons/Alarm';

import * as ROUTES from '@Constants/routes';

const HomeTab = {
  route: ROUTES.HOME,
  icon: <EventIcon />,
  text: 'Calendar',
};

const ResumeTab = {
  route: ROUTES.RESUME,
  icon: <AttachmentIcon />,
  text: 'Resume',
};

const InterviewTab = {
  route: ROUTES.INTERVIEW_SCHEDULING,
  icon: <AlarmIcon />,
  text: 'Interview Availability',
};

// const ProfileTab = {
//   route: ROUTES.PROFILE_WITH_ID(ROUTES.CURR_USER_ID_ALIAS),
//   icon: <AccountBoxIcon />,
//   text: 'Profile',
// };

const InducteesTab = {
  route: ROUTES.INDUCTEES,
  icon: <ListAltIcon />,
  text: 'Inductee Points',
};

const PointsTab = {
  route: ROUTES.POINTS_WITH_ID(ROUTES.CURR_USER_ID_ALIAS),
  icon: <AssessmentOutlinedIcon />,
  text: 'Points',
};

export const OfficerTabs = [
  HomeTab,
  // ProfileTab,
  ResumeTab,
  InducteesTab,
  PointsTab,
  InterviewTab,
];

export const InducteeTabs = [
  HomeTab,
  // ProfileTab,
  ResumeTab,
  PointsTab,
  InterviewTab,
];
