/** @format */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/FirebaseConfig";

const fireBaseApp = initializeApp(firebaseConfig);
const auth = getAuth(fireBaseApp);
const db = getFirestore(fireBaseApp);

export { auth, db };
