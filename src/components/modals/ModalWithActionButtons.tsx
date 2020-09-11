import React from 'react';

import { Button, ButtonProps } from '../buttons/Button';

import { BaseModal } from './BaseModal';

export interface ActionButton extends ButtonProps {
  actionCallback?: (...params: any[]) => any;
  closeModalOnClick?: boolean;
}

export interface ModalProps {
  title: string;
  contentText: string;
  open: boolean;
  handleClose: () => void;
}

interface ModalActionButtonProps {
  modalProps: ModalProps;
  actionButtonList: ActionButton[];
}

export const ModalWithActionButtons = ({
  modalProps,
  actionButtonList,
}: ModalActionButtonProps) => {
  return (
    <BaseModal {...modalProps}>
      {actionButtonList.map((buttonProps: ActionButton) => {
        const {
          name,
          closeModalOnClick = true,
          actionCallback = () => {
            return null;
          },
          ...otherProps
        } = buttonProps;

        const onClickFunction = () => {
          if (closeModalOnClick) {
            modalProps.handleClose();
          }

          actionCallback();
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
