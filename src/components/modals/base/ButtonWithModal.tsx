import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Button, ButtonProps } from '../../buttons/Button';

import { BaseModal } from './BaseModal';

// className for MUI can be put in styleProps, since it is of type ButtonProps
export interface ActionButton {
  buttonName: string;
  actionFunc?: (...params: any[]) => any;
  styleProps?: ButtonProps;
  urlToNavigate?: string;
}

export interface ButtonWithModalProps {
  modalTitle: string;
  modalContentText: string;
  name: string;
  actionButtonList: ActionButton[];
  openButtonStyleProps?: ButtonProps;
}

export const ButtonWithModal = ({
  modalTitle,
  modalContentText,
  name,
  actionButtonList,
  openButtonStyleProps = {},
}: ButtonWithModalProps) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  return (
    <>
      <Button onClick={() => setOpen(true)} {...openButtonStyleProps}>
        {name}
      </Button>

      <BaseModal
        title={modalTitle}
        contentText={modalContentText}
        open={open}
        handleClose={() => setOpen(false)}
      >
        {actionButtonList.map((actionButtonProps: ActionButton) => {
          const {
            buttonName,
            actionFunc = () => {
              return null;
            },
            styleProps = {},
            urlToNavigate,
          } = actionButtonProps;

          const onClickFunction = () => {
            setOpen(false);
            actionFunc();

            if (urlToNavigate !== undefined) {
              history.push(urlToNavigate);
            }
          };

          return (
            <Button key={buttonName} onClick={onClickFunction} {...styleProps}>
              {buttonName}
            </Button>
          );
        })}
      </BaseModal>
    </>
  );
};
