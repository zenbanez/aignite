import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;

const app = getApps().length === 0 
  ? initializeApp({
      credential: cert(serviceAccountKey ? JSON.parse(serviceAccountKey) : {})
    })
  : getApps()[0];

export const dbAdmin = getFirestore(app, 'aignite');
