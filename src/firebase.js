import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , signInWithPopup, signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBmC-jzTkkXHV8QC47TZ1wnVExZNPTQ-gg",
  authDomain: "etkinlik-platformu-98bf9.firebaseapp.com",
  projectId: "etkinlik-platformu-98bf9",
  storageBucket: "etkinlik-platformu-98bf9.firebasestorage.app",
  messagingSenderId: "895847857308",
  appId: "1:895847857308:web:0b5549741fc8b265354159",
  measurementId: "G-4XTNWYX031"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const eventsCollectionRef = collection(db, "events");

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Çıkış yapma fonksiyonu
const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export { auth, provider, db, eventsCollectionRef,signInWithGoogle, logOut  };
