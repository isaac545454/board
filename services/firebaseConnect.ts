import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG86vg3R6flRLdHuy9ZBhkxq4N5DyZfw0",
  authDomain: "novo-alunos.firebaseapp.com",
  projectId: "novo-alunos",
  storageBucket: "novo-alunos.appspot.com",
  messagingSenderId: "501036491991",
  appId: "1:501036491991:web:4af29559dfa7da91b17c92",
  measurementId: "G-V0NSCD00H6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
