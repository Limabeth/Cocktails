import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDXW33FytncH3zF_uFFx1cG2c2N9nmsp7M",
  authDomain: "fd3-iskakov-project.firebaseapp.com",
  projectId: "fd3-iskakov-project",
  storageBucket: "fd3-iskakov-project.appspot.com",
  messagingSenderId: "338063485081",
  appId: "1:338063485081:web:22b69e3a5c7cc6d5033008",
  measurementId: "G-QWMLR0M5GD",
};

firebase.initializeApp(firebaseConfig);

export const createDefaultUserDocument = async (user) => {
  if (!user) {
    return;
  }

  const docRef = firestore.doc("users/" + user.uid);
  const doc = await docRef.get();

  if (!doc.exists) {
    const {email} = user;

    try {
    docRef.set({userDetails: {displayName: "Super User", email}, drinks: []})
    } catch (error) {
      console.log(error);
    }
  }
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();

export const createUserDocument = async (user, data) => {
  if (!user) {
    return;
  }

  const docRef = firestore.doc("users/" + user.uid);
  const doc = await docRef.get();

  if (!doc.exists) {
    const {email} = user;
    const {displayName} = data;

    try {
    docRef.set({userDetails: {displayName, email}, drinks: []})
    } catch (error) {
      console.log(error);
    }
  }
}


