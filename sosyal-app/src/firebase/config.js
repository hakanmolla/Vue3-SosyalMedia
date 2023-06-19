
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDruf-GUULXFDr4BBGLnTKcvH4SekI9uS4",
    authDomain: "aos-sosyal-app-7eb95.firebaseapp.com",
    projectId: "aos-sosyal-app-7eb95",
    storageBucket: "aos-sosyal-app-7eb95.appspot.com",
    messagingSenderId: "155114784614",
    appId: "1:155114784614:web:b94e7394835de64608eaa7"
  };

  const app=initializeApp(firebaseConfig)

  const auth=getAuth(app)

  const db=getFirestore(app)

  export{auth,db}