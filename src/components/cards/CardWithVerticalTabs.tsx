import React, { useState } from 'react';
import { Grid, Tabs as MuiTabs, Tab as MuiTab } from '@material-ui/core';

import { Card } from './Card';

export interface CardWithVerticalTabsProps {
  items: { title: string; element: JSX.Element }[];
}

export function CardWithVerticalTabs({ items }: CardWithVerticalTabsProps) {
  const [index, setIndex] = useState(0);

  const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
    setIndex(newValue);
  };

  const tabElements: JSX.Element[] = items.map(item => (
    <MuiTab label={item.title} key={item.title} />
  ));

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item>
          <MuiTabs orientation='vertical' value={index} onChange={handleChange}>
            {tabElements}
          </MuiTabs>
        </Grid>
        <Grid item>{items[index].element}</Grid>
      </Grid>
    </Card>
  );
}
