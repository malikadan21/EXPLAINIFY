// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCX4YJTF8_mPrTqYGq2NGiwxMrlLXiXsw4",
  authDomain: "codex-f9ef7.firebaseapp.com",
  projectId: "codex-f9ef7",
  storageBucket: "codex-f9ef7.appspot.com",
  messagingSenderId: "1043293964327",
  appId: "1:1043293964327:web:26c7ac905662f402f52602",
  measurementId: "G-XDFG02WEZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;