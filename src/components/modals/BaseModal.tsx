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
  content: string;
  open: boolean;
  handleClose: () => void;
  children: JSX.Element[] | JSX.Element;
}

export const BaseModal = ({
  title,
  content,
  open,
  handleClose,
  children,
}: BaseModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>

      <DialogActions>{children}</DialogActions>
    </Dialog>
  );
};
