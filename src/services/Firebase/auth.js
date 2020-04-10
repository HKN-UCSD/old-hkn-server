import * as firebase from 'firebase/app';
import 'firebase/auth';

// Auth API
const doCreateUserWithEmailAndPassword = (email, password) =>
  firebase.auth.createUserWithEmailAndPassword(email, password);

const doSignInWithEmailAndPassword = (email, password, remembered) =>
  firebase
    .auth()
    .setPersistence(
      remembered
        ? firebase.auth.Auth.Persistence.LOCAL
        : firebase.auth.Auth.Persistence.SESSION
    )
    .then(() => {
      return firebase.auth.signInWithEmailAndPassword(email, password);
    });

const doSignOut = () => firebase.auth().signOut();

const doPasswordReset = email => firebase.auth().sendPasswordResetEmail(email);

const doPasswordUpdate = password =>
  firebase.auth().currentUser.updatePassword(password);

const doSendVerificationEmail = () =>
  firebase.auth().currentUser.sendEmailVerification();

export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
  doPasswordReset,
  doSendVerificationEmail,
  doPasswordUpdate,
};
