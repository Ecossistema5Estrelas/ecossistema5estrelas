import * as admin from "firebase-admin";

type Cred = admin.ServiceAccount;

function readCreds(): Cred {
  const j = process.env.FIREBASE_ADMIN_JSON;
  const b = process.env.FIREBASE_ADMIN_BASE64;
  const p = process.env.FIREBASE_ADMIN_PATH;

  if (j && j.trim()) {
    return JSON.parse(j);
  }
  if (b && b.trim()) {
    const json = Buffer.from(b, "base64").toString("utf8");
    return JSON.parse(json);
  }
  if (p && p.trim()) {
    const fs = require("fs");
    const txt = fs.readFileSync(p, "utf8");
    return JSON.parse(txt);
  }
  throw new Error("FIREBASE_ADMIN_JSON not set");
}

export function getAdminApp() {
  if (admin.apps.length) return admin.app();
  const cred = admin.credential.cert(readCreds());
  return admin.initializeApp({ credential: cred });
}

export function getDb() {
  return getAdminApp().firestore();
}



