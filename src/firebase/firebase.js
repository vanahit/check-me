import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAeVAhyafEWqIrGui_YsJ6VLZngT3YRpec",
    authDomain: "test-project-4ab6b.firebaseapp.com",
    databaseURL: "https://test-project-4ab6b.firebaseio.com",
    projectId: "test-project-4ab6b",
    storageBucket: "test-project-4ab6b.appspot.com",
    messagingSenderId: "883830761189"
};
firebase.initializeApp(config);

const database = firebase.database();

const storage = firebase.storage();


export {firebase, storage, database as default}
