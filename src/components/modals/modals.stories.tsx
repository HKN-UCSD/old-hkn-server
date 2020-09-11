import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ButtonWithModal, ButtonWithModalProps } from './ButtonWithModal';
import { ActionButton } from './ModalWithActionButtons';

export default {
  title: 'Modals/Button With Modal',
  component: ButtonWithModal,
} as Meta;

const Template: Story<ButtonWithModalProps> = args => (
  <ButtonWithModal {...args} />
);

const confirmButtonProps: ActionButton = {
  name: 'Confirm',
  actionCallback: () => alert('You just clicked the confirm button!'),
  primary: true,
  positive: true,
};

const cancelButtonProps: ActionButton = {
  name: 'Cancel',
  primary: true,
  negative: true,
};

export const ButtonWithConfirmationModal = Template.bind({});
ButtonWithConfirmationModal.args = {
  modalTitle: 'Sample Button With Confirmation Modal',
  modalContentText: 'Put any text you want here.',
  name: 'Click on me!',
  actionButtonList: [cancelButtonProps, confirmButtonProps],
  primary: true,
  positive: true,
};

const closeButtonProps: ActionButton = {
  name: 'Close',
};

export const ButtonWithAlertModal = Template.bind({});
ButtonWithAlertModal.args = {
  modalTitle: 'Sample Button With Alert Modal',
  modalContentText: 'Put any text you want here.',
  name: 'Click on me!',
  actionButtonList: [closeButtonProps],
  primary: true,
  negative: true,
};
