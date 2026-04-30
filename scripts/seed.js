const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./service-account.json');

const app = initializeApp({
  credential: cert(serviceAccount)
});

// Pass the database ID as the second argument to getFirestore
const db = getFirestore(app, 'aignite');

const seedNews = async () => {
  console.log("Seeding to 'aignite' database...");
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
  console.log("Success! Seeded to 'aignite' instance.");
};

seedNews().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
