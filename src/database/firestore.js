import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig.json';

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);

export default firestore;
