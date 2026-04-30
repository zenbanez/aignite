const admin = require('firebase-admin');

// Path to the service account key file you downloaded
const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// The UID of the user you want to make an admin 
// (You can find this in the 'Authentication' tab of the Firebase Console)
const uid = 'ofwIQ0Uj22dudykgxlKViP4Ji3u2';

async function makeAdmin(targetUid) {
  try {
    // Set custom user claims on the user
    await admin.auth().setCustomUserClaims(targetUid, { admin: true });
    console.log(`Success! User ${targetUid} is now an admin.`);
    process.exit();
  } catch (error) {
    console.error("Error setting custom claims:", error);
    process.exit(1);
  }
}

makeAdmin(uid);