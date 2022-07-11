import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_APIKEY,
  authDomain: process.env.REACT_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_FIREBASE_BUCKET,
  messagingSenderId: process.env.REACT_FIREBASE_SENDERID,
  appId: process.env.REACT_FIREBASE_ID
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db
