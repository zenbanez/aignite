import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;

const getAdminApp = () => {
  const apps = getApps();
  if (apps.length > 0) return apps[0];
  
  if (serviceAccountKey) {
    try {
      return initializeApp({
        credential: cert(JSON.parse(serviceAccountKey))
      });
    } catch (e) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT:", e);
    }
  }
  
  // Fallback for build time or missing credentials
  // This prevents the build from crashing
  return initializeApp({
    projectId: 'aignite-placeholder'
  }, 'build-app-' + Date.now());
};

const app = getAdminApp();
export const dbAdmin = getFirestore(app, 'aignite');
