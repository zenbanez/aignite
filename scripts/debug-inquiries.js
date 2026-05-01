const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('/home/node/.openclaw/workspace/projects/project_aignite/educator-hub/service-account.json');

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app, 'aignite');

async function debug() {
    // Just fetch all and filter in memory to avoid index issues
    const snapshot = await db.collection('inquiries').get();
    const docs = snapshot.docs.map(d => ({id: d.id, ...d.data()}));
    const sorted = docs
        .filter(d => d.processed === true)
        .sort((a, b) => b.processedAt.toDate() - a.processedAt.toDate());
    
    if (sorted.length > 0) {
        console.log(JSON.stringify(sorted[0], null, 2));
    }
}
debug();
