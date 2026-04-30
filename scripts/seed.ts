import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as serviceAccount from './service-account.json';

// Initialize admin app
const app = initializeApp({
  credential: cert(serviceAccount as any)
});

const db = getFirestore(app);

const seedNews = async () => {
  const newsCollection = db.collection('news');
  const articles = [
    {
      title: "DepEd Order 003 s. 2026: The Human-Centered Shift",
      category: "Policy",
      date: "2026-04-23",
      excerpt: "New guidelines emphasize that AI should support, not replace, Filipino educators in the classroom."
    },
    {
      title: "Project AGAP.AI Rolls Out Nationwide",
      category: "Training",
      date: "2026-04-22",
      excerpt: "Targeting 300,000 teachers, this initiative marks a massive leap in local AI literacy efforts."
    },
    {
      title: "Mastering Prompt Engineering for K-12",
      category: "Resources",
      date: "2026-04-28",
      excerpt: "A practical guide to writing prompts that save time and keep student privacy at the forefront."
    }
  ];

  for (const article of articles) {
    await newsCollection.add(article);
  }
  console.log("Database seeded successfully!");
};

seedNews().catch(console.error);
