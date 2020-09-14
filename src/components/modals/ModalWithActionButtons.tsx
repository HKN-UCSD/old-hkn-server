import React from 'react';

import { Button, ButtonProps } from '../buttons/Button';

import { BaseModal } from './BaseModal';

export interface ModalProps {
  title: string;
  content: string;
  open: boolean;
  handleClose: () => void;
}

interface ModalWithActionButtonProps {
  modalProps: ModalProps;
  actionButtonPropsList: ButtonProps[];
}

export const ModalWithActionButtons = ({
  modalProps,
  actionButtonPropsList,
}: ModalWithActionButtonProps) => {
  return (
    <BaseModal {...modalProps}>
      {actionButtonPropsList.map((buttonProps: ButtonProps) => {
        const { name, onClick, ...otherProps } = buttonProps;

        const onClickFunction = (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          if (onClick !== undefined) {
            onClick(event);
          }

          modalProps.handleClose();
        };

        return (
          <Button key={name} onClick={onClickFunction} {...otherProps}>
            {name}
          </Button>
        );
      })}
    </BaseModal>
  );
};
