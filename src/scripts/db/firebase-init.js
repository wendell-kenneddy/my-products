import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAW-KupdKMzfeJE6XfRf4Qjwyd3efR4LxE',
  authDomain: 'myproducts-70c74.firebaseapp.com',
  projectId: 'myproducts-70c74',
  appId: '1:343263943960:web:9a0a16ffc1a93da7a1126d',
  measurementId: 'G-LB5YXBZDZV'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
