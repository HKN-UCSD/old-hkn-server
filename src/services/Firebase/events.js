import * as firebase from 'firebase/app';
import 'firebase/firestore';

// get events for queried user
const getUserEvent = userId => {
  // console.log("get events for "+userId+" :")
  return firebase
    .firestore()
    .collection('pointReward')
    .where('user_id', '==', userId)
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    })
    .catch(() => {
      throw Error('Points Query failed.');
    });
};

const getPoints = userId => {
  const eventPoints = firebase.firestore().collection('pointReward');
  if (userId) {
    return eventPoints
      .where('user_id', '==', userId)
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => doc.data());
      })
      .catch(() => {
        throw Error('Points Query failed.');
      });
  }

  throw Error('Points Query failed, userId invalid');
};

export { getUserEvent, getPoints };
