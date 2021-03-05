import firebase from 'firebase';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBR6owad08FKVJeIyxrrnF7G51fgNqq9ns",
    authDomain: "hublinks-b4da0.firebaseapp.com",
    projectId: "hublinks-b4da0",
    storageBucket: "hublinks-b4da0.appspot.com",
    messagingSenderId: "246452015126",
    appId: "1:246452015126:web:1302578493f1a251c72537",
    measurementId: "G-JF6BS41CW6"
  };
  // Initialize Firebase

  export default firebase.initializeApp(firebaseConfig);
//   firebase.analytics();