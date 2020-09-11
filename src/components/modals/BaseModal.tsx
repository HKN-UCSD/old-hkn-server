import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface BaseModalProps {
  title: string;
  contentText: string;
  open: boolean;
  handleClose: () => void;
  children: JSX.Element[] | JSX.Element;
}

export const BaseModal = ({
  title,
  contentText,
  open,
  handleClose,
  children,
}: BaseModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>

      <DialogActions>{children}</DialogActions>
    </Dialog>
  );
};
