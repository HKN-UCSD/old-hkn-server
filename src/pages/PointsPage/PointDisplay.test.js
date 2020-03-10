import React from 'react';
import { mount } from 'enzyme';
import Card from '@material-ui/core/Card';

import PointDisplay from './point_display';

describe('<PointDisplay/>', () => {
  let props;

  beforeEach(() => {
    props = {
      points: [
        {
          event_name: 'Test event1',
          date: new Date(2020, 0, 1),
          value: 1,
          officer: 'Test officer',
        },
        {
          event_name: 'Test event2',
          date: new Date(2020, 0, 2),
          value: 2,
          officer: 'Test officer',
        },
      ],
    };
  });

  it('correctly displays when points is not empty', () => {
    const wrapper = mount(<PointDisplay {...props} />);

    expect(wrapper.find(Card)).toHaveLength(2);
    expect(
      wrapper
        .find(Card)
        .first()
        .text()
    ).toBe('Test event1January 1, 2020Officer: Test officerPoints: 1');
    expect(
      wrapper
        .find(Card)
        .last()
        .text()
    ).toBe('Test event2January 2, 2020Officer: Test officerPoints: 2');
  });

  it('correctly displays when points is empty', () => {
    props = {
      points: [],
    };
    const wrapper = mount(<PointDisplay {...props} />);
    expect(wrapper.find(Card)).toHaveLength(0);
  });
});
