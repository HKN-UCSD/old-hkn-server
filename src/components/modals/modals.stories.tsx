import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
  ButtonWithModal,
  ButtonWithModalProps,
  ActionButton,
} from './base/ButtonWithModal';

export default {
  title: 'Modals/Button With Modal',
  component: ButtonWithModal,
} as Meta;

const Template: Story<ButtonWithModalProps> = args => (
  <ButtonWithModal {...args} />
);

const confirmButtonProps: ActionButton = {
  buttonName: 'Confirm',
  actionFunc: () => alert('You just clicked the confirm button!'),
  styleProps: {
    primary: true,
    positive: true,
  },
};

const cancelButtonProps: ActionButton = {
  buttonName: 'Cancel',
  styleProps: {
    primary: true,
    negative: true,
  },
};

export const ButtonWithConfirmationModal = Template.bind({});
ButtonWithConfirmationModal.args = {
  modalTitle: 'Sample Button With Confirmation Modal',
  modalContentText: 'Put any text you want here.',
  name: 'Click on me!',
  actionButtonList: [confirmButtonProps, cancelButtonProps],
  openButtonStyleProps: {
    primary: true,
    positive: true,
  },
};

const closeButtonProps: ActionButton = {
  buttonName: 'Close',
};

export const ButtonWithAlertModal = Template.bind({});
ButtonWithAlertModal.args = {
  modalTitle: 'Sample Button With Alert Modal',
  modalContentText: 'Put any text you want here.',
  name: 'Click on me!',
  actionButtonList: [closeButtonProps],
  openButtonStyleProps: {
    primary: true,
    negative: true,
  },
};
