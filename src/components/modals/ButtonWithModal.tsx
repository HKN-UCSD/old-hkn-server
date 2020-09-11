import React, { useState } from 'react';

import { Button, ButtonProps } from '../buttons/Button';

import {
  ModalProps,
  ModalWithActionButtons,
  ActionButton,
} from './ModalWithActionButtons';

export interface ButtonWithModalProps extends ButtonProps {
  modalTitle: string;
  modalContentText: string;
  actionButtonList: ActionButton[];
}

export const ButtonWithModal = ({
  modalTitle,
  modalContentText,
  name,
  actionButtonList,
  ...otherOpenButtonProps
}: ButtonWithModalProps) => {
  const [open, setOpen] = useState(false);
  const modalProps: ModalProps = {
    title: modalTitle,
    contentText: modalContentText,
    open,
    handleClose: () => setOpen(false),
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} {...otherOpenButtonProps}>
        {name}
      </Button>

      <ModalWithActionButtons
        modalProps={modalProps}
        actionButtonList={actionButtonList}
      />
    </>
  );
};
