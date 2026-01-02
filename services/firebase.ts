
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// NOTE: Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
