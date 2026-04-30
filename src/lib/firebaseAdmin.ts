import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as serviceAccount from '../../service-account.json';

const app = initializeApp({
  credential: cert(serviceAccount as any)
});

export const dbAdmin = getFirestore(app);
