import React from 'react';

import { ButtonWithModal } from './ButtonWithModal';
import { ActionButton } from './ModalWithActionButtons';

export interface ButtonConfirmationModalProps {
  modalTitle: string;
  modalContentText: string;
  name: string;
  confirmButtonProps: ActionButton;
  cancelButtonProps: ActionButton;
}

export const ButtonWithConfirmationModal = ({
  modalTitle,
  modalContentText,
  name,
  confirmButtonProps,
  cancelButtonProps,
  ...otherOpenButtonProps
}: ButtonConfirmationModalProps) => {
  return (
    <ButtonWithModal
      modalTitle={modalTitle}
      modalContentText={modalContentText}
      name={name}
      actionButtonList={[cancelButtonProps, confirmButtonProps]}
      {...otherOpenButtonProps}
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
  ...otherOpenButtonProps
}: ButtonAlertModalProps) => {
  return (
    <ButtonWithModal
      modalTitle={modalTitle}
      modalContentText={modalContentText}
      name={name}
      actionButtonList={[closeButtonProps]}
      {...otherOpenButtonProps}
    />
  );
};
