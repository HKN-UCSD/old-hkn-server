import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const updateResumeFields = (filename, timestamp, downloadURL) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(this.auth.currentUser.uid)
    .update({
      resumeUploadTimestamp: timestamp,
      resumeFilename: filename,
      resumeDownloadURL: downloadURL,
    });
};

const removeResumeFields = () =>
  firebase
    .firestore()
    .collection('users')
    .doc(this.auth.currentUser.uid)
    .update({
      resumeFilename: firebase.firestore.FieldValue.delete(),
      resumeUploadTimestamp: firebase.firestore.FieldValue.delete(),
      resumeDownloadURL: firebase.firestore.FieldValue.delete(),
    });

// Storage
const uploadResume = resumeFile => {
  return firebase
    .storage()
    .ref()
    .child('users')
    .child(this.auth.currentUser.uid)
    .child('resume')
    .child(resumeFile.name)
    .put(resumeFile);
};

const deleteResume = resumeFilename =>
  firebase
    .storage()
    .ref()
    .child('users')
    .child(this.auth.currentUser.uid)
    .child('resume')
    .child(resumeFilename)
    .delete();

export { updateResumeFields, removeResumeFields, uploadResume, deleteResume };
