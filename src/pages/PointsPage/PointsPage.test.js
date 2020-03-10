import React from 'react';
import { mount } from 'enzyme';
import { withFirebase } from '../../services/Firebase/index';
// import test from 'firebase-functions-test'

import PointsPage from './points';

class FirebaseMock {
  getEnumMap = collection => {
    if (collection === 'roles') {
      return new Promise(() => {
        return { Officer: 'Officer', Inductee: 'Inductee', Member: 'Member' };
      });
    }
    if (collection === 'pointRewardType') {
      return new Promise(() => {
        // return test.firestore.makeDocumentSnapshot({ Induction_Point: 'Induction Point', Member_Point: 'Member Point' }, 'document/path')
        return {
          Induction_Point: 'Induction Point',
          Member_Point: 'Member Point',
        };
      });
    }
    return null;
  };

  getUserDocument = () => {
    return new Promise(() => {
      return {
        data: {
          email: 'tester@testing.test',
          name: 'Testing Tester',
          role_id: 'testKey',
          mentorship: true,
          professional: true,
        },
      };
    });
  };
}

describe('<PointsPage />', () => {
  it('renders', () => {
    const wrapper = mount(<PointsPage />, {
      wrappingComponent: withFirebase.Provider,
      wrappingComponentProps: { value: new FirebaseMock() },
    });

    console.log(wrapper.debug());
  });
});
