import { initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";

let app;

if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}
const adminAuth = admin.auth(app); //allows us to generate and verify Firebase auth tokens

const adminDb = initFirestore({
  //allows us to read and write Realtime Database data with full admin privileges
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});

export { adminDb, adminAuth };
