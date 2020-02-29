import React from 'react';
import { mount } from 'enzyme';
import { FirebaseContext } from '../Firebase'
//import test from 'firebase-functions-test'

import PointsPage from './points'

class FirebaseMock {
  getEnumMap = (collection) => {
    if (collection === 'roles') {
      return new Promise((resolve) => {
        return { Officer: 'Officer', Inductee: 'Inductee', Member: 'Member' }
      })
    }
    if (collection === 'pointRewardType') {
      return new Promise((resolve) => {
        //return test.firestore.makeDocumentSnapshot({ Induction_Point: 'Induction Point', Member_Point: 'Member Point' }, 'document/path')
        return { Induction_Point: 'Induction Point', Member_Point: 'Member Point' }
      })
    }
  }

  getUserDocument = () => {
    return new Promise((resolve) => {
      return {
        data: {
          email: 'tester@testing.test',
          name: 'Testing Tester',
          role_id: 'testKey',
          mentorship: true,
          professional: true,
        }
      }
    })
  }
}

describe('<PointsPage />', () => {

  it('renders', () => {
    const wrapper = mount(<PointsPage />, {
      wrappingComponent: FirebaseContext.Provider,
      wrappingComponentProps: { value: new FirebaseMock() }
    })

    console.log(wrapper.debug())
  })

})

