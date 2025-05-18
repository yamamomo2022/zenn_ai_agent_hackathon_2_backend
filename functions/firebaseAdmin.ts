import * as admin from "firebase-admin";
import serviceAccountJson from "./service-account-key.json";

// Firebaseの初期化（すでに初期化済みなら再初期化しない）
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson as admin.ServiceAccount),
  });
}

export const verifyIdToken = async (idToken: string) => {
  return admin.auth().verifyIdToken(idToken);
};