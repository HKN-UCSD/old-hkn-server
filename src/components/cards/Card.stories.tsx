import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Card, CardProps } from './Card';

export default {
  title: 'Cards/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = args => {
  const { children } = args;
  return <Card>{children}</Card>;
};

export const SampleCard = Template.bind({});
SampleCard.args = {
  children: <h1>Put stuff here!</h1>,
};
