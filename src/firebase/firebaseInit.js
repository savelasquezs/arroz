import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
	apiKey: 'AIzaSyDJunXqWmaPEsld1SCUWsFc8Azs3O2Pzv8',
	authDomain: 'senor-56e7b.firebaseapp.com',
	projectId: 'senor-56e7b',
	storageBucket: 'senor-56e7b.appspot.com',
	messagingSenderId: '802362588894',
	appId: '1:802362588894:web:10bbe916f86094832e8c4f',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);
export { db, auth, functions };
