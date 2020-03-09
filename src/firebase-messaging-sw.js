importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyA64z6wB13NbuQBYeA3pyyljWoOFR4URXI",
  authDomain: "sugestao-de-melhoria.firebaseapp.com",
  databaseURL: "https://sugestao-de-melhoria.firebaseio.com",
  projectId: "sugestao-de-melhoria",
  storageBucket: "sugestao-de-melhoria.appspot.com",
  messagingSenderId: "748422759763",
  appId: "1:748422759763:web:9a5a778365c1809cb40da6",
  measurementId: "G-EWKRNLBTX2"
});
const messaging = firebase.messaging();
