import React from 'react';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
} from '@material-ui/core';

export interface CardProps {
  children: JSX.Element;
}

export function Card({ children, ...props }: CardProps): JSX.Element {
  return (
    <MuiCard elevation={3} {...props}>
      <MuiCardContent>{children}</MuiCardContent>
    </MuiCard>
  );
}
