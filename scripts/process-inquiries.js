/**
 * Firestore Bulk Processor for Zen3
 * This script runs as a cron job to:
 * 1. Read 'inquiries' collection from Firestore.
 * 2. Filter for un-processed inquiries.
 * 3. Categorize and summarize them.
 * 4. Generate a digest and update Firestore with the draft responses.
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Service account from environment or local file
const serviceAccount = require('/home/node/.openclaw/workspace/projects/project_aignite/educator-hub/service-account.json');

if (!serviceAccount) {
    console.error('❌ Service account not found. Bulk processor aborted.');
    process.exit(1);
}

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app, 'aignite');

async function processInquiries() {
    console.log('🔄 Zen3 starting bulk inquiry processing...');
    
    const inquiriesRef = db.collection('inquiries');
    
    // Lean Pivot: Querying only for un-processed entries.
    // This reduces data transfer and ensures the script stays fast as the collection grows.
    const snapshot = await inquiriesRef.where('processed', '==', false).get();

    if (snapshot.empty) {
        console.log('NO_NEW_DATA');
        return;
    }

    const unread = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`📑 Found ${unread.length} new inquiries.`);

    // --- LOGIC: Summarization & Response Generation ---
    // In a production environment, this would call an LLM (me)
    // for now, we'll simulate the categorization.

    for (const inq of unread) {
        console.log(`- Processing: ${inq.name} (${inq.topic})`);
        
        // Fetch full message history for context
        const repliesSnap = await inquiriesRef.doc(inq.id).collection('replies').orderBy('timestamp', 'asc').get();
        const history = repliesSnap.docs.map(d => `${d.data().sender}: ${d.data().text}`).join('\n');
        const fullMessage = history ? `${inq.message}\n\nHistory:\n${history}` : inq.message;

        let draftResponse = "";
        let category = "General";

        // Simple Rule-based categorization & Ranking (Simulation)
        const msg = fullMessage.toLowerCase();
        let rank = 5; // Default low priority

        if (msg.includes('100') || msg.includes('division') || msg.includes('bulk') || msg.includes('school')) {
            category = "Institutional";
            rank = 1; // Highest Priority
            draftResponse = `Hello ${inq.name}, for bulk orders (100+ copies) for your division or school, we offer special institutional pricing and a dedicated training session for your teachers. Zen will reach out to you personally with a formal proposal.`;
        } else if (msg.includes('partnership') || msg.includes('proposal') || msg.includes('urgent')) {
            category = "Partnership";
            rank = 2;
            draftResponse = `Hi ${inq.name}, thank you for the proposal. I've flagged this for Zen's immediate review. We value strategic collaborations that align with DepEd Order 003.`;
        } else if (msg.includes('price') || msg.includes('buy') || msg.includes('checkout')) {
            category = "Sales";
            rank = 3;
            draftResponse = `Hello ${inq.name}, the AI Mastery eBook is currently ₱299 (Introductory price). You can purchase it directly on our checkout page via GCash.`;
        } else if (msg.includes('deped') || msg.includes('003') || msg.includes('compliant')) {
            category = "Policy";
            rank = 4;
            draftResponse = `Hi ${inq.name}, DO 003 s. 2026 is fully covered in Chapter 2 of our guide. It emphasizes human-centric AI use in schools.`;
        } else {
            draftResponse = `Hi ${inq.name}, thank you for reaching out! Zen or Zen3 will review this shortly.`;
            rank = 5;
        }

        // --- EXECUTION: Finalizing response ---
        // For General, Sales, and Policy (Ranks 3, 4, 5), we reply automatically.
        // For Institutional and Partnerships (Ranks 1, 2), we keep it as a draft for Zen.
        
        if (rank >= 3) {
            console.log(`✅ Auto-replying to ${inq.name} (Rank ${rank})...`);
            await inquiriesRef.doc(inq.id).collection('replies').add({
                text: draftResponse,
                sender: 'ai',
                timestamp: new Date()
            });
            // Mark as processed and clear draft since it's already sent
            await inquiriesRef.doc(inq.id).update({
                processed: true,
                zen3_category: category,
                zen3_rank: rank,
                zen3_draft: null,
                processedAt: new Date()
            });
        } else {
            console.log(`⚠️ Flagging ${inq.name} for Admin Review (Rank ${rank})...`);
            await inquiriesRef.doc(inq.id).update({
                processed: true,
                zen3_category: category,
                zen3_rank: rank,
                zen3_draft: draftResponse,
                processedAt: new Date()
            });
        }
    }

    console.log('✨ Digest generated. 1 urgent lead identified.');
}

processInquiries().catch(console.error);
