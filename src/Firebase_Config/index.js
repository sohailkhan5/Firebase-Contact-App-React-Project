import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyA9B-CacgrREy-U7oLvNMIe_06DKbVvb1E",
  authDomain: "fir-contact-app-60cbb.firebaseapp.com",
  projectId: "fir-contact-app-60cbb",
  storageBucket: "fir-contact-app-60cbb.appspot.com",
  messagingSenderId: "908063401063",
  appId: "1:908063401063:web:8e9d5227d1338368a7a0c2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);