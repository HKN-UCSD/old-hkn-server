import React from 'react';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
} from '@material-ui/core';

export interface CardProps {
  children: JSX.Element;
}

export function Card(props: CardProps): JSX.Element {
  const { children } = props;
  return (
    <MuiCard elevation={3}>
      <MuiCardContent>{children}</MuiCardContent>
    </MuiCard>
  );
}
