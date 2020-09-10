import React from 'react';

import { ButtonProps } from '../buttons/Button';

import { ButtonWithModal, ActionButton } from './base/ButtonWithModal';

export interface ButtonConfirmationModalProps {
  modalTitle: string;
  modalContentText: string;
  name: string;
  confirmButtonProps: ActionButton;
  cancelButtonProps: ActionButton;
  openButtonStyleProps?: ButtonProps;
}

export const ButtonWithConfirmationModal = ({
  modalTitle,
  modalContentText,
  name,
  confirmButtonProps,
  cancelButtonProps,
  openButtonStyleProps = {},
}: ButtonConfirmationModalProps) => {
  return (
    <ButtonWithModal
      modalTitle={modalTitle}
      modalContentText={modalContentText}
      name={name}
      actionButtonList={[confirmButtonProps, cancelButtonProps]}
      openButtonStyleProps={openButtonStyleProps}
    />
  );
};

export interface ButtonAlertModalProps {
  modalTitle: string;
  modalContentText: string;
  name: string;
  closeButtonProps: ActionButton;
}

export const ButtonWithAlertModal = ({
  modalTitle,
  modalContentText,
  name,
  closeButtonProps,
}: ButtonAlertModalProps) => {
  return (
    <ButtonWithModal
      modalTitle={modalTitle}
      modalContentText={modalContentText}
      name={name}
      actionButtonList={[closeButtonProps]}
    />
  );
};
